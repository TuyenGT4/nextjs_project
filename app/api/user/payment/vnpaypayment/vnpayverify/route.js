import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/booking";
import crypto from "crypto";
import querystring from "qs";

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    let vnp_Params = {};

    // Lấy tất cả params từ URL
    for (const [key, value] of searchParams.entries()) {
      vnp_Params[key] = value;
    }

    const secureHash = vnp_Params["vnp_SecureHash"];
    const secretKey = process.env.VNPAY_HASH_SECRET;

    // Xóa các trường hash để verify
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    // Lấy thông tin từ response
    const vnp_ResponseCode = vnp_Params["vnp_ResponseCode"];
    const vnp_TxnRef = vnp_Params["vnp_TxnRef"];
    const vnp_TransactionNo = vnp_Params["vnp_TransactionNo"];

    // Tìm booking theo vnpay_order_id
    const booking = await Booking.findOne({ vnpay_order_id: vnp_TxnRef });

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    if (!booking) {
      console.log("Booking not found for order:", vnp_TxnRef);
      return NextResponse.redirect(
        new URL(
          "/dashboard/user/vnpay/cancel? error=booking_not_found",
          baseUrl
        )
      );
    }

    // Verify chữ ký
    if (secureHash === signed) {
      if (vnp_ResponseCode === "00") {
        // Thanh toán thành công
        booking.payment_status = "1";
        booking.transaction_id = vnp_TransactionNo;
        booking.status = "active";
        await booking.save();

        console.log("Payment successful:", {
          bookingId: booking._id,
          transactionNo: vnp_TransactionNo,
        });

        return NextResponse.redirect(
          new URL(
            `/dashboard/user/vnpay/success?bookingId=${booking._id}`,
            baseUrl
          )
        );
      } else {
        // Thanh toán thất bại
        console.log("Payment failed with code:", vnp_ResponseCode);
        return NextResponse.redirect(
          new URL(
            `/dashboard/user/vnpay/cancel?error=payment_failed&code=${vnp_ResponseCode}`,
            baseUrl
          )
        );
      }
    } else {
      // Chữ ký không hợp lệ
      console.log("Invalid signature");
      return NextResponse.redirect(
        new URL(
          "/dashboard/user/vnpay/cancel? error=invalid_signature",
          baseUrl
        )
      );
    }
  } catch (error) {
    console.error("VNPay verify error:", error);
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return NextResponse.redirect(
      new URL("/dashboard/user/vnpay/cancel? error=server_error", baseUrl)
    );
  }
}
