"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function PromoCardEditor() {
  const [form, setForm] = useState({
    shortTitle: "",
    mainTital: "",

    shortDesc: "",
    linkUrl: "",
    photo: null,
    existingPhotoUrl: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState({
    text: "",
    isError: false,
  });

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.API}/admin/bookarea`);

        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu khuyến mãi");
        }

        const data = await response.json();

        if (data) {
          setForm({
            shortTitle: data?.shortTitle || "",

            mainTital: data?.mainTital || "",
            shortDesc: data?.shortDesc || "",
            linkUrl: data?.linkUrl || "",
            photo: null,
            existingPhotoUrl: data?.photoUrl || "",
          });

          if (data?.photoUrl) {
            setImagePreview(data?.photoUrl);
          }
        }
      } catch (error) {
        console.log("Không thể tải dữ liệu khuyến mãi", error);
        setServerMessage({ text: "Failed to load promo data", isError: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromoData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setForm((prev) => ({ ...prev, photo: file }));

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(response);
      if (!response.ok) {
        throw new Error("Không thể tải lên hình ảnh");
      }

      const data = await response.json();
      console.log(data);
      return data?.secure_url;
    } catch (error) {
      console.log("cloudinary upload error", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    setServerMessage({ text: "", isError: false });

    try {
      let imageUrl = form.existingPhotoUrl;
      if (form.photo) {
        imageUrl = await uploadImageToCloudinary(form.photo);
      }

      const requestBody = {
        shortTitle: form.shortTitle,
        mainTital: form.mainTital,
        shortDesc: form.shortDesc,
        linkUrl: form.linkUrl,
        photoUrl: imageUrl,
      };

      const response = await fetch(`${process.env.API}/admin/bookarea`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || "Không thể lưu khuyến mãi");
      }

      const result = await response.json();

      setServerMessage({
        text: result.message || "Cập nhật khuyến mãi thành công",
        isError: false,
      });

      setForm((prev) => ({
        ...prev,
        existingPhotoUrl: imageUrl,
        photo: null,
      }));
    } catch (error) {
      setServerMessage({
        text: error.message || "Đã xảy ra lỗi khi lưu",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        mt: 4,
      }}
    >
      <Typography variant="h6" mb={2}>
        Snap Booking
      </Typography>

      {serverMessage.text && (
        <Alert
          severity={serverMessage.isError ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {serverMessage.text}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          name="shortTitle"
          label="Tiêu đề ngắn"
          value={form.shortTitle}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            mb: 3,
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC",
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC",
              },
            },
          }}
        />
        <TextField
          name="mainTitle"
          label="Tiêu đề chính"
          value={form.mainTitle}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            mb: 3,
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC",
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC",
              },
            },
          }}
        />
        <TextField
          name="shortDesc"
          label="Mô tả ngắn"
          value={form.shortDesc}
          onChange={handleChange}
          rows={5}
          fullWidth
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            mb: 3,
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC",
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC",
              },
            },
          }}
        />
        <TextField
          name="linkUrl"
          label="Đường dẫn URL"
          value={form.linkUrl}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            mb: 3,
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC",
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC",
              },
            },
          }}
        />

        {/* Image preview */}
        {imagePreview && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Xem trước hình ảnh:
            </Typography>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "4px",
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          component="label"
          disabled={isSubmitting}
          sx={{
            backgroundColor: "#8A12FC",
            "&:hover": {
              backgroundColor: "#7a0ae8",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC",
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC",
              },
            },
          }}
        >
          {imagePreview ? "Đổi ảnh" : "Tải lên ảnh"}
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            backgroundColor: "#8A12FC",
            "&:hover": {
              backgroundColor: "#7a0ae8",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC",
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC",
              },
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Cập nhật Snap Booking"
          )}
        </Button>
      </Stack>
    </Box>
  );
}
