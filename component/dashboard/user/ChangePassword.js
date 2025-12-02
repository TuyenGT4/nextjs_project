"use client";

// components/ChangePasswordForm.js
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Box,
} from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ oldPassword, newPassword });

    if (newPassword !== confirmPassword) {
      setAlert({
        type: "Lỗi",
        message: "Mật khẩu mới không khớp",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${process.env.API}/user/change/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);

        setAlert({
          type: "Thành công",
          message: "Đổi mật khẩu thành công",
        });

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setLoading(false);
        setAlert({
          type: "error",
          message: data?.err,
        });
      }
    } catch (error) {
      setAlert({
        type: "Lỗi",
        message: "Đã xảy ra lỗi",
      });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Box
        sx={{ width: "100%", padding: "2rem", boxShadow: 9, borderRadius: 1 }}
      >
        {alert.message && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Đổi mật khẩu
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Mật khẩu cũ"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              style: { color: "#8A12FC" },
            }}
            sx={{
              mb: 3,
              input: { color: "#8A12FC" },
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
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              style: { color: "#8A12FC" },
            }}
            sx={{
              mb: 3,
              input: { color: "#8A12FC" },
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
            label="Xác nhận mật khẩu"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              style: { color: "#8A12FC" },
            }}
            sx={{
              mb: 3,
              input: { color: "#8A12FC" },
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#8A12FC",
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#8A12FC",
                },
                "&:hover fieldset": {
                  borderColor: "#8A12FC",
                  backgroundColor: "#8A12FC",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8A12FC",
                },
              },
            }}
          >
            <BeatLoader
              color="white"
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />

            {loading ? "" : "Đổi mật khẩu"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePasswordForm;
