import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import { runAi } from "@/ai/ai";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { styles, chipColors, animations } from "./AICategoryGeneratorstyles";

const AICategoryGenerator = ({ onSelectCategory, onAddCategory }) => {
  const [loading, setLoading] = useState(false);
  const [generatedCategories, setGeneratedCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [generationCount, setGenerationCount] = useState(0);

  const [error, setError] = useState(null);

  const generateCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `Tạo 5 tên danh mục phòng khách sạn hoàn toàn độc đáo cho lần thử ${
        generationCount + 1
      } hấp dẫn với du khách hiện đại.

      Hướng dẫn:
      1. Kết hợp danh mục cho các loại du khách khác nhau (công vụ, gia đình, cặp đôi, solo, sang trọng, tiết kiệm)
      2. Thay đổi theo kích thước phòng, chất lượng view và tiện nghi đặc biệt
      3. Sử dụng các từ tu sức hấp dẫn (Cao cấp, Sang trọng, Hành chính, Ấm cúng, Rộng rãi)
      4. Bao gồm ít nhất một khái niệm sáng tạo (như "Phòng thông minh" hoặc "Căn hộ Xanh")
      5. Không bao giờ lặp lại danh mục từ các lần trước
      6. Đảm bảo tên rõ ràng nhưng đặc biệt

      Yêu cầu định dạng:
      - Chỉ phân cách bằng dấu phẩy
      - Không đánh số hoặc bullet
      - Mỗi danh mục 2-4 từ
      - Ví dụ: "Phòng Suite Toàn Cảnh, Căn Hộ Đô Thị, Phòng Gia Đình Giường Tầng"`;

      const response = await runAi(prompt);

      console.log("response", response);
      let categories = response
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0);

      if (categories.length !== 5) {
        throw new Error(`Cần 5 danh mục, got ${categories.length}`);
      }

      console.log(" categories", categories);
      setGeneratedCategories(categories);

      setGenerationCount((prev) => prev + 1);
    } catch (error) {
      setError("Không thể tạo danh mục. Vui lòng thử lại");
      setGeneratedCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleAdd = () => {
    if (selectedCategory) {
      onAddCategory(selectedCategory);
      setSelectedCategory("");
    }
  };

  const clearGenerated = () => {
    setGeneratedCategories([]);
    setSelectedCategory("");
  };

  return (
    <Box sx={styles.container}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" sx={styles.header}>
            Tạo danh mục bằng AI
          </Typography>
          <Tooltip title="Tạo danh mục mới">
            <ShuffleIcon
              fontSize="small"
              sx={{
                color: "#FD79A8",
                animation: loading ? "spin 2s linear infinite" : "none",
                ...animations.spin,
              }}
            />
          </Tooltip>
        </Box>
        {generatedCategories.length > 0 && (
          <IconButton
            onClick={clearGenerated}
            size="small"
            sx={styles.closeButton}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Button
        startIcon={!loading && <ShuffleIcon />}
        variant="contained"
        onClick={generateCategories}
        disabled={loading}
        fullWidth
        sx={styles.generateButton}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
        ) : (
          "Tạo danh mục mới"
        )}
      </Button>

      {error && (
        <Box sx={styles.errorBox}>
          <Typography variant="body2" sx={styles.errorText}>
            <CloseIcon fontSize="small" />
            {error}
          </Typography>
        </Box>
      )}

      {generatedCategories.length > 0 && (
        <>
          <Divider sx={styles.divider} />

          <Typography variant="subtitle1" sx={styles.suggestionsTitle}>
            <span style={{ color: "#FD79A8" }}>✦</span> Gợi ý AI (Select one):
          </Typography>

          <Stack direction="row" sx={styles.chipsContainer}>
            {generatedCategories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onClick={() => handleSelect(category)}
                variant={selectedCategory === category ? "filled" : "outlined"}
                sx={styles.chip(
                  chipColors[index % chipColors.length],
                  selectedCategory === category
                )}
              />
            ))}
          </Stack>

          <Box display="flex" justifyContent="flex-end">
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleAdd}
              disabled={!selectedCategory}
              sx={styles.addButton}
            >
              Thêm vào danh mục
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AICategoryGenerator;
