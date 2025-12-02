import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import Booking from "@/model/booking";
import RoomBookedDate from "@/model/roomBookedDate";
import crypto from "crypto";
import querystring from "qs";

function generateBookingCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function generateDateRange(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);

  while (current <= new Date(endDate)) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

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

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return NextResponse.json({ err: "Not authenticated" }, { status: 401 });
  }

  try {
    const {
      pricePerNight,
      nights,
      subtotal,
      discountPercent,
      discountAmount,
      total,
      rooms,
      guests,
      roomTypeName,
      room_id,
      checkIn,
      checkOut,
      image,
      billingDetails,
      paymentMethod,
    } = await req.json();

    const { country, name, email, phone, address, state, zipCode } =
      billingDetails;

    // Tạo booking mới
    const newBooking = new Booking({
      rooms_id: room_id,
      user_id: session?.user._id,
      check_in: checkIn,
      check_out: checkOut,
      person: guests,
      number_of_rooms: rooms,
      total_night: nights,
      actual_price: pricePerNight,
      subtotal,
      discount: discountAmount,
      total_price: total,
      payment_method: paymentMethod,
      transaction_id: "",
      payment_status: "0",
      name,
      email,
      phone,
      country,
      state,
      zip_code: zipCode,
      address,
      code: generateBookingCode(),
      status: "inactive",
    });

    await newBooking.save();

    // Lưu ngày đặt phòng
    if (room_id && newBooking?._id && checkIn && checkOut) {
      const dates = generateDateRange(checkIn, checkOut);
      const bookedDates = dates.map((date) => ({
        booking_id: newBooking?._id,
        room_id,
        book_date: date,
      }));
      await RoomBookedDate.insertMany(bookedDates);
    }

    // ============ VNPAY CONFIGURATION ============
    const tmnCode = process.env.VNPAY_TMN_CODE;
    const secretKey = process.env.VNPAY_HASH_SECRET;
    const vnpUrl =
      process.env.VNPAY_URL ||
      "https://sandbox.vnpayment.vn/paymentv2/vpcpay. html";
    const returnUrl = process.env.VNPAY_RETURN_URL;

    const date = new Date();
    const createDate = date
      .toISOString()
      .replace(/[-:T. Z]/g, "")
      .slice(0, 14);
    const orderId =
      newBooking._id.toString().slice(-8) + Date.now().toString().slice(-6);

    // VNPay yêu cầu số tiền * 100, đơn vị là VND
    const amount = Math.round(total) * 100;

    // Kiểm tra số tiền tối thiểu (10,000 VND)
    if (amount < 1000000) {
      return NextResponse.json(
        { err: "Số tiền tối thiểu là 10,000 VND" },
        { status: 400 }
      );
    }

    const ipAddr =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "127.0.0. 1";

    let vnp_Params = {
      vnp_Version: "2.1. 0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: "Thanh toan dat phong " + newBooking.code,
      vnp_OrderType: "other",
      vnp_Amount: amount,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const paymentUrl =
      vnpUrl + "?" + querystring.stringify(vnp_Params, { encode: false });

    // Lưu orderId vào booking để verify sau
    newBooking.vnpay_order_id = orderId;
    await newBooking.save();

    console.log("VNPay Payment created:", {
      orderId,
      amount: total,
      vnpAmount: amount,
      bookingCode: newBooking.code,
    });

    return NextResponse.json({
      paymentUrl,
      bookingId: newBooking._id,
    });
  } catch (err) {
    console.error("VNPay payment creation error:", err);
    return NextResponse.json(
      { err: err.message || "Failed to create VNPay payment" },
      { status: 500 }
    );
  }
}
