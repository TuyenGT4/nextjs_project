"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Chip,
  Stack,
  Modal,
  IconButton,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RoomAssignment from "./RoomAssignment";

// Styled Components
const SummaryCard = styled(Card)(({ theme, color }) => ({
  borderLeft: `4px solid ${theme.palette[color].main}`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  "&:before": {
    content: '""',
    display: "block",
    width: "4px",
    height: "20px",
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    borderRadius: "2px",
  },
}));

const BookingDetails = ({ booking, onFieldChange, onSave, onCancel }) => {
  // Format date for date input fields (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch (e) {
      console.error("Date formatting error:", e);
      return "";
    }
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Chưa gán";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateTotalNights = () => {
    if (!booking.check_in || !booking.check_out) return 0;
    const diffTime = new Date(booking.check_out) - new Date(booking.check_in);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleDateChange = (field, value) => {
    const newBooking = { ...booking, [field]: value };

    // Recalculate if both dates exist
    if (newBooking.check_in && newBooking.check_out) {
      const checkIn = new Date(newBooking.check_in);
      const checkOut = new Date(newBooking.check_out);

      if (checkOut > checkIn) {
        const diffTime = checkOut - checkIn;
        const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        newBooking.total_night = totalNights;
        newBooking.subtotal =
          totalNights * newBooking.actual_price * newBooking.number_of_rooms;
        newBooking.total_price =
          newBooking.subtotal - (newBooking.discount || 0);
      }
    }

    onFieldChange(newBooking);
  };

  const getStatusChip = (status) => {
    const statusMap = {
      active: { label: "Đã xác nhận", color: "success" },
      inactive: { label: "Chờ xác nhận", color: "warning" },
      cancelled: { label: "Đã hủy", color: "error" },
    };
    const currentStatus = statusMap[status] || {
      label: status,
      color: "default",
    };
    return (
      <Chip
        label={currentStatus.label}
        color={currentStatus.color}
        size="small"
        variant="outlined"
      />
    );
  };

  const getPaymentChip = (paymentStatus) => {
    return paymentStatus === "1" ? (
      <Chip
        label="Đã thanh toán"
        color="success"
        size="small"
        variant="outlined"
      />
    ) : (
      <Chip
        label="Chờ thanh toán"
        color="warning"
        size="small"
        variant="outlined"
      />
    );
  };

  if (!booking) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard color="primary">
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  Mã đặt phòng
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {booking.code || "N/A"}
                </Typography>
              </CardContent>
            </SummaryCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard color="secondary">
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  Ngày đặt
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {formatDateForDisplay(booking.createdAt)}
                </Typography>
              </CardContent>
            </SummaryCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard color="info">
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  Phương thức thanh toán
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {booking.payment_method}
                </Typography>
              </CardContent>
            </SummaryCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard
              color={booking.payment_status === "1" ? "success" : "warning"}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <Typography variant="caption" color="text.secondary">
                      Trạng thái thanh toán
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {getPaymentChip(booking.payment_status)}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" color="text.secondary">
                      Trạng thái đặt phòng
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {getStatusChip(booking.status)}
                    </Typography>
                  </div>
                </Stack>
              </CardContent>
            </SummaryCard>
          </Grid>
        </Grid>

        {/* Booking Details Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader variant="h6">Thông tin đặt phòng</SectionHeader>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "action.hover",
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Thông tin phòng
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        Loại phòng
                      </Typography>
                      <Typography>
                        {booking.rooms_id?.roomtype_id?.name || "Chưa chỉ định"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        Số phòng
                      </Typography>
                      <Typography>{booking.number_of_rooms}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        Giá/đêm
                      </Typography>
                      <Typography>
                        {Number(booking.actual_price).toLocaleString("vi-VN")}{" "}
                        VND
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        Tổng số đêm
                      </Typography>
                      <Typography>{calculateTotalNights()}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography variant="caption" color="text.secondary">
                        Số người
                      </Typography>
                      <Typography>{booking.person}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "action.hover",
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Thời gian lưu trú
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Ngày nhận phòng"
                        type="date"
                        value={formatDateForInput(booking.check_in)}
                        onChange={(e) =>
                          handleDateChange("check_in", e.target.value)
                        }
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Ngày trả phòng"
                        type="date"
                        value={formatDateForInput(booking.check_out)}
                        onChange={(e) =>
                          handleDateChange("check_out", e.target.value)
                        }
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Số lượng phòng"
                        type="number"
                        value={booking.number_of_rooms}
                        onChange={(e) => {
                          const inputValue = parseInt(e.target.value) || 1;

                          // ✅ Clamp to availableRooms
                          const newRooms =
                            inputValue > booking.availableRooms
                              ? booking.availableRooms
                              : inputValue;

                          const newSubtotal =
                            calculateTotalNights() *
                            booking.actual_price *
                            newRooms;

                          onFieldChange({
                            ...booking,
                            number_of_rooms: newRooms,
                            subtotal: newSubtotal,
                            total_price: newSubtotal - (booking.discount || 0),
                          });
                        }}
                        fullWidth
                        inputProps={{ min: 1, max: booking.availableRooms }} // ✅ max limit set
                      />

                      <Typography>
                        Phòng còn trống: {booking?.availableRooms}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={8}></Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Tạm tính:</Typography>
                      <Typography fontWeight="medium">
                        {Number(booking.subtotal).toLocaleString("vi-VN")} VND
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Giảm giá:</Typography>
                      <Typography fontWeight="medium" color="error. main">
                        -{Number(booking.discount || 0).toLocaleString("vi-VN")}{" "}
                        VND
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1">Tổng cộng:</Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {Number(booking.total_price).toLocaleString("vi-VN")}{" "}
                        VND
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Status Management Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader variant="h6">Quản lý trạng thái</SectionHeader>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Trạng thái thanh toán"
                  value={booking.payment_status}
                  onChange={(e) =>
                    onFieldChange({
                      ...booking,
                      payment_status: e.target.value,
                    })
                  }
                  fullWidth
                >
                  <MenuItem value="0">Chờ thanh toán</MenuItem>
                  <MenuItem value="1">Đã thanh toán</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Trạng thái đặt"
                  value={booking.status}
                  onChange={(e) =>
                    onFieldChange({ ...booking, status: e.target.value })
                  }
                  fullWidth
                >
                  <MenuItem value="inactive">Chờ xác nhận</MenuItem>
                  <MenuItem value="active">Đã xác nhận</MenuItem>
                  <MenuItem value="cancelled">Đã hủy</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Customer Information Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SectionHeader variant="h6">Thông tin khách hàng</SectionHeader>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Họ và tên"
                  value={booking.name}
                  //  onChange={(e) => onFieldChange({ ...booking, name: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Email"
                  type="email"
                  value={booking.email}
                  //onChange={(e) => onFieldChange({ ...booking, email: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Số điện thoại"
                  value={booking.phone}
                  //  onChange={(e) => onFieldChange({ ...booking, phone: e.target.value })}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onCancel} sx={{ minWidth: 120 }}>
            Hủy
          </Button>
          <Button variant="contained" onClick={onSave} sx={{ minWidth: 120 }}>
            Lưu thay đổi
          </Button>
        </Box>
      </Box>

      <RoomAssignment booking={booking} />
    </>
  );
};

export default BookingDetails;
