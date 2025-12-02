import { useState, useEffect } from "react";
import { Container, Grid, Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import BillingDetails from "./BillingDetails";
import BookingSummary from "./BookingSummary";
import PaymentGateways from "./PaymentGateways";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [pricingData, setPricingData] = useState(null);

  const { data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      const alldata = {
        roomId: params.get("roomId"),
        checkIn: params.get("checkIn"),
        checkOut: params.get("checkOut"),
        guests: parseInt(params.get("guests")),
        rooms: parseInt(params.get("rooms")),
      };

      fetchPricingData(alldata);
    }
  }, []);

  const fetchPricingData = async (bookingData) => {
    try {
      const response = await fetch(`${process.env.API}/user/checkoutdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: bookingData.roomId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
          rooms: bookingData.rooms,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể tải thông tin giá");
      }

      const result = await response.json();

      setPricingData({
        pricePerNight: result.pricePerNight,
        nights: result.nights,
        subtotal: result.subtotal,
        discountPercent: result.discountPercent,
        discountAmount: result.discountAmount,
        total: result.total,
        rooms: result.rooms,
        guests: result.guests,
        roomTypeName: result.roomTypeName,
        room_id: result?.room_id,
        checkIn: result?.checkIn,
        checkOut: result?.checkOut,
        image: result.image,
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thanh toán VNPay
  const handleVNPay = async (orderData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.API}/user/payment/vnpaypayment/vnpay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err || "Không thể tạo thanh toán VNPay");
        setLoading(false);
      } else {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.log("VNPay payment error:", error);
      toast.error("Lỗi khi khởi tạo thanh toán VNPay");
      setLoading(false);
    }
  };

  // Xử lý thanh toán COD
  const handleCOD = async (orderData) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/user/place-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errordata = await response.json();
        throw new Error(errordata.message);
      }

      const result = await response.json();
      toast.success("Đặt phòng thành công!");
      router.push("/dashboard/user");
    } catch (error) {
      toast.error(`Đặt phòng thất bại: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!billingDetails?.isValid) {
      const errorField = Object.entries(billingDetails?.data || {}).find(
        ([key, value]) => key !== "country" && (!value || value.trim() === "")
      );

      if (errorField) {
        toast.error(`Vui lòng điền đúng thông tin ${errorField[0]}`);
      } else {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    const orderData = {
      ...pricingData,
      billingDetails: billingDetails.data,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      switch (selectedPaymentMethod.toLowerCase()) {
        case "vnpay":
          await handleVNPay(orderData);
          break;
        case "cod":
        default:
          await handleCOD(orderData);
          break;
      }
    } catch (error) {
      toast.error(`Đặt phòng thất bại: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <CircularProgress
          size={80}
          sx={{
            color: "purple",
            animation: "spin 2s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(180deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <BillingDetails onBillingDetailsChange={setBillingDetails} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BookingSummary pricingData={pricingData} />
          <PaymentGateways
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            handlePlaceOrder={handlePlaceOrder}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
