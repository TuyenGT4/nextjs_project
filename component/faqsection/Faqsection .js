import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const dummyQuestions = [
  {
    question: "Làm thế nào để đặt phòng khách sạn?",
    answer:
      "Bạn có thể đặt phòng khách sạn thông qua website của chúng tôi bằng cách làm theo các bước đơn giản sau...",
  },
  {
    question: "Làm thế nào để truy cập trang quản trị?",
    answer:
      "Để truy cập trang quản trị, bạn cần đăng nhập trước và làm theo các hướng dẫn sau...",
  },
  {
    question: "Những lợi ích khi sử dụng dịch vụ của chúng tôi?",
    answer:
      "Chúng tôi cung cấp nhiều lợi ích bao gồm giảm giá, ưu đãi độc quyền và hỗ trợ khách hàng 24/7...",
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(dummyQuestions.length - 1);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={{ color: "grey.700" }}
            >
              CÂU HỎI THƯỜNG GẶP
            </Typography>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Đặt câu hỏi và nhận hỗ trợ nhanh chóng
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Chúng tôi luôn ưu tiên giải đáp mọi thắc mắc của bạn. Hãy đặt câu
              hỏi và nhận được câu trả lời nhanh chóng.
            </Typography>
            {dummyQuestions.map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                sx={{ mb: 2, boxShadow: 3, "&:last-child": { mb: 0 } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/hotel8.jpg"
              alt="Thinking Woman"
              sx={{ width: "100%", borderRadius: 1, boxShadow: 3 }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FAQSection;
