"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// Tách phần sử dụng useSearchParams ra component riêng
const VNPayCancelContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const code = searchParams.get("code");

  const getErrorMessage = () => {
    switch (error) {
      case "booking_not_found":
        return "Không tìm thấy đơn đặt phòng";
      case "payment_failed":
        return `Thanh toán thất bại (Mã lỗi: ${code || "Unknown"})`;
      case "invalid_signature":
        return "Xác thực không hợp lệ";
      case "server_error":
        return "Lỗi hệ thống";
      default:
        return "Thanh toán không thành công";
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#212121"
      textAlign="center"
      color="white"
      px={3}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaTimesCircle color="#f44336" size={130} />
      </motion.div>
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Thanh toán thất bại
      </Typography>
      <Typography variant="body1" gutterBottom color="gray">
        {getErrorMessage()}
      </Typography>
      <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
        Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
      </Typography>
      <Box display="flex" gap={2} mt={3}>
        <Button variant="contained" color="error" onClick={() => router.back()}>
          Thử lại
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => router.push("/")}
        >
          Về trang chủ
        </Button>
      </Box>
    </Box>
  );
};

// Component loading
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    bgcolor="#212121"
  >
    <CircularProgress color="error" />
  </Box>
);

// Component chính - wrap trong Suspense
const VNPayCancel = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VNPayCancelContent />
    </Suspense>
  );
};

export default VNPayCancel;
