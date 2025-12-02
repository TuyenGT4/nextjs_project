// components/ServiceComponent.js
import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const services = [
  {
    title: "Đặt Phòng Khách Sạn Tại Địa Điểm Mong Muốn",
    description:
      "Bạn có thể dễ dàng đặt phòng khách sạn tại địa điểm ưa thích. Chúng tôi cam kết mang đến trải nghiệm tuyệt vời và dịch vụ chu đáo cho mọi khách hàng.",
    buttonText: "Xem thêm",
  },
  {
    title: "Đặt Resort Tại Địa Điểm Phù Hợp",
    description:
      "Đặt resort tại những địa điểm lý tưởng với dịch vụ đẳng cấp. Chúng tôi đảm bảo mang lại kỳ nghỉ tuyệt vời và những kỷ niệm đáng nhớ cho bạn.",
    buttonText: "Xem thêm",
  },
  {
    title: "Đặt Sảnh Tiệc Cưới Tại Địa Điểm Lý Tưởng",
    description:
      "Tổ chức đám cưới trong mơ tại những sảnh tiệc sang trọng. Chúng tôi sẵn sàng hỗ trợ để ngày trọng đại của bạn trở nên hoàn hảo và đáng nhớ.",
    buttonText: "Xem thêm",
  },
  {
    title: "Đặt Phòng Hội Nghị Chuyên Nghiệp",
    description:
      "Tổ chức sự kiện và hội nghị tại các phòng họp hiện đại, trang bị đầy đủ. Chúng tôi cam kết mang đến không gian chuyên nghiệp cho sự kiện của bạn.",
    buttonText: "Xem thêm",
  },
];

const ServiceComponent = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" m={8} component="h1" align="center" gutterBottom>
        Danh sách dịch vụ
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "red",
                    "&:hover": { backgroundColor: "red" },
                  }}
                >
                  {service.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServiceComponent;
