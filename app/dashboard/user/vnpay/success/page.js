"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const VNPaySuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

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
        <FaCheckCircle color="#4caf50" size={130} />
      </motion.div>
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Thanh toán thành công!
      </Typography>
      <Typography variant="body1" gutterBottom color="gray">
        Cảm ơn bạn đã đặt phòng. Thanh toán qua VNPay đã được xác nhận.
      </Typography>
      {bookingId && (
        <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
          Mã đặt phòng: {bookingId}
        </Typography>
      )}
      <Box display="flex" gap={2} mt={3}>
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push("/dashboard/user")}
        >
          Xem đơn đặt phòng
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

export default VNPaySuccess;
