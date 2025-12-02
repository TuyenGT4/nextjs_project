"use client";

import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Hotel,
  Restaurant,
  Pool,
  Spa,
  LocationOn,
  Star,
  EmojiEvents,
  Verified,
  Diamond,
  Favorite,
  Security,
  SupportAgent,
  Eco,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const About = () => {
  const router = useRouter();

  // Câu chuyện thành lập - Timeline
  const timeline = [
    {
      year: "2008",
      title: "Khởi Đầu Giấc Mơ",
      description:
        "SERENOVA được thành lập bởi nhóm với tầm nhìn tạo nên một điểm đến nghỉ dưỡng đẳng cấp tại Việt Nam.",
    },
    {
      year: "2012",
      title: "Mở Rộng Quy Mô",
      description:
        "Khánh thành tòa nhà mới với 200 phòng cao cấp, nhà hàng 5 sao và trung tâm hội nghị quốc tế.",
    },
    {
      year: "2018",
      title: "Công Nhận Quốc Tế",
      description:
        "Đạt chứng nhận 5 sao quốc tế và được vinh danh trong Top 10 khách sạn tốt nhất Đông Nam Á.",
    },
    {
      year: "2024",
      title: "Hướng Tới Tương Lai",
      description:
        "Tiên phong trong xu hướng du lịch bền vững với cam kết carbon trung tính và trải nghiệm số hóa.",
    },
  ];

  // Tầm nhìn và giá trị cốt lõi
  const coreValues = [
    {
      icon: <Diamond sx={{ fontSize: 40, color: "#FF6F61" }} />,
      title: "Xuất Sắc",
      description:
        "Cam kết mang đến trải nghiệm hoàn hảo trong từng chi tiết nhỏ nhất.",
    },
    {
      icon: <Favorite sx={{ fontSize: 40, color: "#FF6F61" }} />,
      title: "Hiếu Khách",
      description:
        "Đón tiếp mỗi vị khách như người thân trong gia đình với sự ấm áp và chân thành.",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#FF6F61" }} />,
      title: "Tin Cậy",
      description:
        "Xây dựng lòng tin thông qua sự minh bạch và nhất quán trong dịch vụ.",
    },
    {
      // icon: <Eco sx={{ fontSize: 40, color: "#FF6F61" }} />,
      icon: <Security sx={{ fontSize: 40, color: "#FF6F61" }} />,
      title: "Bền Vững",
      description:
        "Bảo vệ môi trường và đóng góp tích cực cho cộng đồng địa phương.",
    },
  ];

  // Điểm khác biệt (USP)
  const uniquePoints = [
    {
      icon: <LocationOn sx={{ fontSize: 50, color: "white" }} />,
      title: "Vị Trí Đắc Địa",
      description:
        "Tọa lạc tại trung tâm thành phố, cách bãi biển chỉ 5 phút đi bộ, thuận tiện di chuyển đến mọi điểm tham quan.",
    },
    {
      icon: <Hotel sx={{ fontSize: 50, color: "white" }} />,
      title: "Phòng Nghỉ Sang Trọng",
      description:
        "500+ phòng được thiết kế theo phong cách hiện đại, trang bị nội thất cao cấp và view panorama tuyệt đẹp.",
    },
    {
      icon: <Restaurant sx={{ fontSize: 50, color: "white" }} />,
      title: "Ẩm Thực Đỉnh Cao",
      description:
        "5 nhà hàng với đa dạng ẩm thực từ Á đến Âu, được điều hành bởi các đầu bếp sao Michelin.",
    },
    {
      icon: <Spa sx={{ fontSize: 50, color: "white" }} />,
      title: "Spa & Wellness",
      description:
        "Trung tâm spa 2000m² với các liệu pháp trị liệu độc quyền, hồ bơi vô cực và phòng gym hiện đại.",
    },
    {
      icon: <SupportAgent sx={{ fontSize: 50, color: "white" }} />,
      title: "Dịch Vụ 24/7",
      description:
        "Đội ngũ concierge chuyên nghiệp sẵn sàng phục vụ mọi yêu cầu của quý khách bất kể ngày đêm.",
    },
    {
      icon: <Pool sx={{ fontSize: 50, color: "white" }} />,
      title: "Tiện Ích Đẳng Cấp",
      description:
        "Hồ bơi vô cực, bãi biển riêng, sân tennis, kids club và trung tâm hội nghị 1000 chỗ.",
    },
  ];

  // Đội ngũ lãnh đạo
  const leadershipTeam = [
    {
      name: "VŨ ĐỨC ANH",
      position: "Tổng Giám Đốc",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "25 năm kinh nghiệm trong ngành khách sạn quốc tế",
    },
    {
      name: "NGUYỄN VĂN DƯƠNG",
      position: "Giám Đốc Điều Hành",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Chuyên gia quản trị khách sạn từ Cornell University",
    },
    {
      name: "Lê Hoàng Nam",
      position: "Bếp Trưởng Điều Hành",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Đầu bếp sao Michelin với 15 năm kinh nghiệm quốc tế",
    },
    {
      name: "Phạm Thanh Thảo",
      position: "Giám Đốc Spa & Wellness",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Chuyên gia trị liệu được đào tạo tại Thái Lan và Bali",
    },
  ];

  // Giải thưởng và chứng nhận
  const awards = [
    {
      year: "2024",
      title: "World Luxury Hotel Awards",
      organization: "World Luxury Hotel Awards",
    },
    {
      year: "2023",
      title: "TripAdvisor Travelers' Choice",
      organization: "TripAdvisor",
    },
    {
      year: "2023",
      title: "Best Luxury Beach Resort - Asia",
      organization: "World Travel Awards",
    },
    {
      year: "2022",
      title: "Green Hotel Certification",
      organization: "ASEAN Tourism",
    },
    {
      year: "2022",
      title: "Excellence in Service",
      organization: "Vietnam Tourism Awards",
    },
    {
      year: "2021",
      title: "Best Wedding Venue",
      organization: "Luxury Lifestyle Awards",
    },
  ];

  // Thống kê
  const stats = [
    { number: "500+", label: "Phòng Sang Trọng" },
    { number: "50+", label: "Nhân Viên Chuyên Nghiệp" },
    { number: "100K+", label: "Khách Hàng Hài Lòng" },
    { number: "16+", label: "Năm Kinh Nghiệm" },
  ];

  return (
    <Box>
      {/* ===== HEADER SECTION - Banner ấn tượng ===== */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "80vh" },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { md: "fixed" },
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
              CHÀO MỪNG ĐẾN VỚI SERENOVA
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2.5rem", md: "4rem" },
                mb: 3,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Câu Chuyện Của Chúng Tôi
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 800,
                mx: "auto",
                opacity: 0.9,
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.8,
              }}
            >
              Hơn 16 năm kiến tạo những kỷ niệm đáng nhớ, chúng tôi tự hào là
              điểm đến của sự sang trọng, ấm áp và trải nghiệm khó quên.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ===== SECTION 1: Câu Chuyện Thành Lập ===== */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Hotel History"
              sx={{
                width: "100%",
                height: { xs: 300, md: 450 },
                objectFit: "cover",
                borderRadius: 4,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{ color: "#FF6F61", letterSpacing: 3, fontSize: "0.85rem" }}
            >
              CÂU CHUYỆN CỦA CHÚNG TÔI
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                my: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Khởi nguồn từ đam mê và hiếu khách
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.9 }}
            >
              Năm 2008, giữa bãi biển xanh ngắt của vùng duyên hải miền Trung,
              gia đình Nguyễn đã biến giấc mơ thành hiện thực khi đặt viên gạch
              đầu tiên cho SERENOVA. Xuất phát từ niềm đam mê với ngành dịch vụ
              và tình yêu quê hương, chúng tôi mong muốn mang đến cho du khách
              một trải nghiệm nghỉ dưỡng đích thực.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.9 }}
            >
              Qua hơn 16 năm phát triển, từ một khách sạn nhỏ 50 phòng, SERENOVA
              đã trở thành tổ hợp nghỉ dưỡng 5 sao với hơn 500 phòng, 5 nhà hàng
              và vô số tiện ích đẳng cấp. Nhưng điều không đổi chính là triết lý
              &quot;Mỗi vị khách là một người thân&quot; - kim chỉ nam cho mọi
              hoạt động của chúng tôi.
            </Typography>
          </Grid>
        </Grid>

        {/* Timeline */}
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 6,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Hành Trình Phát Triển
          </Typography>
          <Grid container spacing={3}>
            {timeline.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 3,
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#FF6F61",
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 35px rgba(255,111,97,0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      color: "#FF6F61",
                      mb: 1,
                    }}
                  >
                    {item.year}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* ===== SECTION 2: Tầm Nhìn & Giá Trị ===== */}
      <Box sx={{ backgroundColor: "#f8f9fa", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: "#FF6F61", letterSpacing: 3, fontSize: "0.85rem" }}
            >
              TẦM NHÌN & GIÁ TRỊ
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mt: 1,
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Triết Lý Kinh Doanh
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: "text.secondary",
                lineHeight: 1.8,
              }}
            >
              Chúng tôi tin rằng mỗi kỳ nghỉ là một hành trình khám phá bản
              thân. Vì vậy, SERENOVA cam kết mang đến không gian để bạn thư
              giãn, kết nối và tạo nên những kỷ niệm đáng nhớ bên người thân
              yêu.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 4,
                    backgroundColor: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      "& .value-icon": {
                        transform: "scale(1.2)",
                      },
                    },
                  }}
                >
                  <Box
                    className="value-icon"
                    sx={{ mb: 2, transition: "transform 0.3s ease" }}
                  >
                    {value.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== SECTION 3: Điểm Khác Biệt (USP) ===== */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6, color: "white" }}>
            <Typography
              variant="overline"
              sx={{ color: "#FF6F61", letterSpacing: 3, fontSize: "0.85rem" }}
            >
              ĐIỀU GÌ LÀM NÊN SỰ KHÁC BIỆT
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mt: 1,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Tại Sao Chọn SERENOVA?
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {uniquePoints.map((point, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0. 1)",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,111,97,0. 1)",
                      transform: "translateY(-5px)",
                      borderColor: "#FF6F61",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{point.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "white", mb: 1 }}
                  >
                    {point.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}
                  >
                    {point.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== SECTION 4: Hình Ảnh Gallery ===== */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: "#FF6F61", letterSpacing: 3, fontSize: "0.85rem" }}
          >
            KHÁM PHÁ KHÔNG GIAN
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mt: 1,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Trải Nghiệm Đẳng Cấp
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Hotel Lobby"
              sx={{
                width: "100%",
                height: { xs: 250, md: 400 },
                objectFit: "cover",
                borderRadius: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={12}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Room"
                  sx={{
                    width: "100%",
                    height: { xs: 120, md: 195 },
                    objectFit: "cover",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                />
              </Grid>
              <Grid item xs={6} md={12}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Pool"
                  sx={{
                    width: "100%",
                    height: { xs: 120, md: 195 },
                    objectFit: "cover",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Restaurant"
              sx={{
                width: "100%",
                height: { xs: 150, md: 200 },
                objectFit: "cover",
                borderRadius: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Spa"
              sx={{
                width: "100%",
                height: { xs: 150, md: 200 },
                objectFit: "cover",
                borderRadius: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Beach"
              sx={{
                width: "100%",
                height: { xs: 150, md: 200 },
                objectFit: "cover",
                borderRadius: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push("/gallery")}
            sx={{
              borderColor: "#FF6F61",
              color: "#FF6F61",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#FF6F61",
                color: "white",
                borderColor: "#FF6F61",
              },
            }}
          >
            Xem Thêm Hình Ảnh
          </Button>
        </Box>
      </Container>

      {/* ===== SECTION 5: Thống Kê ===== */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255,111,97,0. 9), rgba(255,111,97,0.9)), url('https://images. unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: "center", color: "white" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== SECTION 6: Đội Ngũ Lãnh Đạo ===== */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: "#FF6F61", letterSpacing: 3, fontSize: "0.85rem" }}
          >
            ĐỘI NGŨ CỦA CHÚNG TÔI
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mt: 1,
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Ban Lãnh Đạo
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 600, mx: "auto", color: "text.secondary" }}
          >
            Những người dẫn dắt SERENOVA với tầm nhìn, kinh nghiệm và niềm đam
            mê cống hiến cho ngành dịch vụ.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {leadershipTeam.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    "& .member-avatar": {
                      transform: "scale(1.05)",
                      boxShadow: "0 10px 30px rgba(255,111,97,0.3)",
                    },
                  },
                }}
              >
                <Avatar
                  className="member-avatar"
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: 150,
                    height: 150,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid #FF6F61",
                    transition: "all 0.3s ease",
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#FF6F61", fontWeight: 500, mb: 1 }}
                >
                  {member.position}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {member.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ===== SECTION 7: Giải Thưởng & Chứng Nhận ===== */}
      <Box sx={{ backgroundColor: "#f8f9fa", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: "#FF6F61", letterSpacing: 3, fontSize: "0.85rem" }}
            >
              THÀNH TỰU
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mt: 1,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Giải Thưởng & Chứng Nhận
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {awards.map((award, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(10px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "#FFF3F1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <EmojiEvents sx={{ fontSize: 30, color: "#FF6F61" }} />
                  </Box>
                  <Box>
                    <Chip
                      label={award.year}
                      size="small"
                      sx={{
                        backgroundColor: "#FF6F61",
                        color: "white",
                        mb: 0.5,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {award.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {award.organization}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              textAlign: "center",
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Chip
              icon={<Verified sx={{ color: "#4CAF50" }} />}
              label="ISO 9001:2015"
              variant="outlined"
              sx={{ px: 2, py: 2.5 }}
            />
            <Chip
              icon={<Verified sx={{ color: "#4CAF50" }} />}
              label="Khách Sạn 5 Sao"
              variant="outlined"
              sx={{ px: 2, py: 2.5 }}
            />
            <Chip
              icon={<Verified sx={{ color: "#4CAF50" }} />}
              label="Green Globe Certified"
              variant="outlined"
              sx={{ px: 2, py: 2.5 }}
            />
            <Chip
              icon={<Verified sx={{ color: "#4CAF50" }} />}
              label="HACCP Food Safety"
              variant="outlined"
              sx={{ px: 2, py: 2.5 }}
            />
          </Box>
        </Container>
      </Box>

      {/* ===== SECTION 8: Call-to-Action ===== */}
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
              Sẵn Sàng Cho Kỳ Nghỉ Hoàn Hảo?
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: "auto" }}
            >
              Đặt phòng ngay hôm nay để nhận ưu đãi đặc biệt và bắt đầu hành
              trình trải nghiệm đẳng cấp tại SERENOVA.
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
                onClick={() => router.push("/contact")}
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 5,
                  py: 1.5,
                  fontSize: "1. 1rem",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0. 1)",
                    borderColor: "white",
                  },
                }}
              >
                Liên Hệ Tư Vấn
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
