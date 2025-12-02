"use client";

import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  Divider,
  Link,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  WhatsApp,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Support,
  DirectionsCar,
  Train,
  Flight,
  CheckCircle,
  Chat,
  HeadsetMic,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    requestType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Loại yêu cầu
  const requestTypes = [
    { value: "booking", label: "Đặt phòng" },
    { value: "inquiry", label: "Thông tin chung" },
    { value: "feedback", label: "Góp ý / Phản hồi" },
    { value: "complaint", label: "Khiếu nại" },
    { value: "partnership", label: "Hợp tác kinh doanh" },
    { value: "event", label: "Tổ chức sự kiện" },
    { value: "other", label: "Khác" },
  ];

  // Thông tin liên hệ
  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 28, color: "#FF6F61" }} />,
      title: "Hotline 24/7",
      primary: "+84 123 456 789",
      secondary: "+84 987 654 321",
      description: "Kết nối trực tiếp với nhân viên hỗ trợ",
      action: "tel:+84123456789",
    },
    {
      icon: <Email sx={{ fontSize: 28, color: "#FF6F61" }} />,
      title: "Email",
      primary: "booking@SERENOVA.com",
      secondary: "support@SERENOVA. com",
      description: "Phản hồi trong vòng 24 giờ",
      action: "mailto:booking@SERENOVA.com",
    },
    {
      icon: <LocationOn sx={{ fontSize: 28, color: "#FF6F61" }} />,
      title: "Địa chỉ",
      primary: "123 Đường Biển Xanh",
      secondary: "Quận Sơn Trà, Đà Nẵng",
      description: "Việt Nam",
      action: "https://maps.google.com/? q=16. 0544,108.2022",
    },
    {
      icon: <AccessTime sx={{ fontSize: 28, color: "#FF6F61" }} />,
      title: "Giờ làm việc",
      primary: "Lễ tân: 24/7",
      secondary: "Văn phòng: 8:00 - 22:00",
      description: "Tất cả các ngày trong tuần",
      action: null,
    },
  ];

  // Đội ngũ hỗ trợ
  const supportTeam = [
    {
      name: "Nguyễn Thị Mai",
      role: "Quản lý Lễ tân",
      image:
        "https://images.unsplash. com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Trần Văn Hùng",
      role: "Chuyên viên Đặt phòng",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d? ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Lê Thị Hương",
      role: "Hỗ trợ Khách hàng",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Hướng dẫn đường đi
  const directions = [
    {
      icon: <Flight sx={{ fontSize: 24, color: "#FF6F61" }} />,
      title: "Từ Sân bay",
      description:
        "Cách sân bay quốc tế Đà Nẵng 8km (15 phút lái xe).  Dịch vụ đón tiễn sân bay có sẵn.",
    },
    {
      icon: <Train sx={{ fontSize: 24, color: "#FF6F61" }} />,
      title: "Phương tiện công cộng",
      description:
        "Xe buýt số 6 dừng ngay trước khách sạn.  Ga Đà Nẵng cách 5km.",
    },
    {
      icon: <DirectionsCar sx={{ fontSize: 24, color: "#FF6F61" }} />,
      title: "Bãi đỗ xe",
      description:
        "Bãi đỗ xe miễn phí cho khách.  Sức chứa 200 xe ô tô và 500 xe máy.",
    },
  ];

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Giả lập gửi form - thay bằng API thực tế
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSnackbar({
        open: true,
        message:
          "Gửi tin nhắn thành công!  Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
        severity: "success",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        requestType: "",
        message: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* ===== HEADER SECTION ===== */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "40vh", md: "50vh" },
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images. unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography
              variant="overline"
              sx={{
                color: "#FF6F61",
                letterSpacing: 4,
                fontSize: { xs: "0.8rem", md: "1rem" },
                mb: 2,
                display: "block",
              }}
            >
              LIÊN HỆ VỚI CHÚNG TÔI
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", md: "3. 5rem" },
                mb: 2,
              }}
            >
              Chúng Tôi Luôn Sẵn Sàng Hỗ Trợ
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 600,
                mx: "auto",
                opacity: 0.9,
                fontSize: { xs: "0.9rem", md: "1.1rem" },
              }}
            >
              Đội ngũ nhân viên chuyên nghiệp 24/7 sẵn sàng giải đáp mọi thắc
              mắc và hỗ trợ bạn có kỳ nghỉ hoàn hảo
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ===== QUICK CONTACT BAR ===== */}
      <Box sx={{ backgroundColor: "#FF6F61", py: 2 }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={4} md={3}>
              <Link
                href="tel:+84123456789"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                <Phone />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  +84 123 456 789
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Link
                href="mailto:booking@SERENOVA.com"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                <Email />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  booking@SERENOVA.com
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Link
                href="https://wa.me/84123456789"
                target="_blank"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                <WhatsApp />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  WhatsApp
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== MAIN CONTENT - Form & Info ===== */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          {/* Left Column - Contact Form */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                p: { xs: 3, md: 5 },
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Gửi Tin Nhắn Cho Chúng Tôi
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 4 }}
              >
                Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ và tên *"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                      placeholder="Nguyễn Văn A"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="example@email.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại *"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      placeholder="0123 456 789"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Loại yêu cầu"
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                    >
                      <MenuItem value="">-- Chọn loại yêu cầu --</MenuItem>
                      {requestTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Nội dung tin nhắn *"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={<Send />}
                      sx={{
                        backgroundColor: "#FF6F61",
                        px: 5,
                        py: 1.5,
                        fontSize: "1rem",
                        "&:hover": {
                          backgroundColor: "#e55a4f",
                        },
                      }}
                    >
                      {loading ? "Đang gửi..." : "Gửi Tin Nhắn"}
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {/* Response time notice */}
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  backgroundColor: "#f8f9fa",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CheckCircle sx={{ color: "#4CAF50" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <strong>Cam kết phản hồi:</strong> Chúng tôi sẽ trả lời tin
                  nhắn của bạn trong vòng 24 giờ làm việc. Đối với yêu cầu khẩn
                  cấp, vui lòng gọi Hotline 24/7.
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Right Column - Contact Info */}
          <Grid item xs={12} md={5}>
            {/* Contact Info Cards */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    transition: "all 0.3s ease",
                    cursor: info.action ? "pointer" : "default",
                    "&:hover": {
                      transform: info.action ? "translateX(10px)" : "none",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() =>
                    info.action && window.open(info.action, "_blank")
                  }
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        backgroundColor: "#FFF3F1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", mb: 0.5 }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#FF6F61", fontWeight: 500 }}
                      >
                        {info.primary}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {info.secondary}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.disabled" }}
                      >
                        {info.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}

              {/* Hotline 24/7 Special Card */}
              <Card
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                  color: "white",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <HeadsetMic sx={{ fontSize: 40, color: "#FF6F61" }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Hotline Khẩn Cấp 24/7
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Kết nối trực tiếp với nhân viên hỗ trợ
                    </Typography>
                  </Box>
                </Box>
                <Link
                  href="tel:+841900xxxx"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    py: 2,
                    backgroundColor: "#FF6F61",
                    borderRadius: 2,
                    color: "white",
                    textDecoration: "none",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#e55a4f",
                    },
                  }}
                >
                  1900 XXXX
                </Link>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    mt: 1,
                    opacity: 0.7,
                  }}
                >
                  Miễn phí cuộc gọi • Không phải bot
                </Typography>
              </Card>

              {/* Social Media */}
              <Card sx={{ p: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Kết nối với chúng tôi
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    href="https://facebook.com"
                    target="_blank"
                    sx={{
                      backgroundColor: "#1877F2",
                      color: "white",
                      "&:hover": { backgroundColor: "#1565C0" },
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    href="https://instagram. com"
                    target="_blank"
                    sx={{
                      background:
                        "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                      color: "white",
                      "&:hover": { opacity: 0.9 },
                    }}
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    href="https://twitter.com"
                    target="_blank"
                    sx={{
                      backgroundColor: "#1DA1F2",
                      color: "white",
                      "&:hover": { backgroundColor: "#1A91DA" },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    href="https://youtube.com"
                    target="_blank"
                    sx={{
                      backgroundColor: "#FF0000",
                      color: "white",
                      "&:hover": { backgroundColor: "#CC0000" },
                    }}
                  >
                    <YouTube />
                  </IconButton>
                  <IconButton
                    href="https://wa.me/84123456789"
                    target="_blank"
                    sx={{
                      backgroundColor: "#25D366",
                      color: "white",
                      "&:hover": { backgroundColor: "#1DA851" },
                    }}
                  >
                    <WhatsApp />
                  </IconButton>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ===== SUPPORT TEAM SECTION ===== */}
      <Box sx={{ backgroundColor: "#f8f9fa", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: "#FF6F61", letterSpacing: 3 }}
            >
              ĐỘI NGŨ HỖ TRỢ
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mt: 1,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Những Người Sẵn Sàng Giúp Đỡ Bạn
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {supportTeam.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: "auto",
                      mb: 2,
                      border: "4px solid #FF6F61",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#FF6F61" }}>
                    {member.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== DIRECTIONS SECTION ===== */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: "#FF6F61", letterSpacing: 3 }}
          >
            HƯỚNG DẪN ĐI LẠI
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mt: 1,
              fontSize: { xs: "1. 5rem", md: "2rem" },
            }}
          >
            Cách Đến SERENOVA
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {directions.map((direction, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#f8f9fa",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor: "#FFF3F1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {direction.icon}
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {direction.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {direction.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ===== GOOGLE MAPS SECTION ===== */}
      <Box sx={{ position: "relative" }}>
        <iframe
          src="https://www.google. com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0547087898843!2d108.19932841531857!3d16.054408988884513!2m3! 1f0!2f0!3f0!3m2!1i1024!2i768! 4f13.1!3m3! 1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2zxJDDoCBO4bq1bmcsIFZp4buHdCBOYW0!5e0! 3m2!1svi!2s! 4v1699000000000!5m2! 1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Map Overlay Card */}
        <Card
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: { md: "50%" },
            left: { md: "5%" },
            transform: { md: "translateY(-50%)" },
            width: { xs: "100%", md: 350 },
            p: 3,
            m: { xs: 0, md: 0 },
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            SERENOVA Resort & Spa
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}
          >
            <LocationOn sx={{ color: "#FF6F61", mt: 0.5 }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              123 Đường Biển Xanh, Quận Sơn Trà,
              <br />
              Thành phố Đà Nẵng, Việt Nam
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            href="https://maps.google.com/? q=16.0544,108.2022"
            target="_blank"
            sx={{
              backgroundColor: "#FF6F61",
              "&:hover": { backgroundColor: "#e55a4f" },
            }}
          >
            Mở trong Google Maps
          </Button>
        </Card>
      </Box>

      {/* ===== CTA SECTION ===== */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Sẵn Sàng Đặt Phòng?
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.9, mb: 4, maxWidth: 500, mx: "auto" }}
            >
              Đừng chần chừ! Đặt phòng ngay để nhận ưu đãi tốt nhất cho kỳ nghỉ
              của bạn.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/allrooms")}
                sx={{
                  backgroundColor: "#FF6F61",
                  px: 5,
                  py: 1.5,
                  fontSize: "1. 1rem",
                  "&:hover": {
                    backgroundColor: "#e55a4f",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Đặt Phòng Ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="tel:+84123456789"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                  },
                }}
              >
                Gọi Ngay
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ===== SNACKBAR ===== */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
