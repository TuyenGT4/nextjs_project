import { styles, iconColors } from "./bookingSummaryStyles";

import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import QrCode2Icon from "@mui/icons-material/QrCode2";

const PaymentGateways = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  handlePlaceOrder,
  loading,
}) => {
  const paymentMethods = [
    {
      value: "cod",
      label: "Thanh toán khi nhận phòng",
      icon: <LocalAtmIcon />,
      color: iconColors.cod,
    },
    {
      value: "vnpay",
      label: "VNPay - Quét mã QR",
      icon: <QrCode2Icon />,
      color: "linear-gradient(135deg, #0066cc 0%, #004499 100%)",
    },
  ];

  return (
    <Card sx={styles.card}>
      <CardHeader
        title="Phương thức thanh toán"
        sx={styles.cardHeader}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={styles.formLabel}>
            Chọn phương thức thanh toán của bạn
          </FormLabel>
          <RadioGroup
            aria-label="payment-method"
            name="payment-method"
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            {paymentMethods.map((method) => (
              <Box
                key={method.value}
                sx={{
                  ...styles.paymentOption,
                  ...(selectedPaymentMethod === method.value && {
                    borderLeft: "4px solid #6a11cb",
                    backgroundColor: "rgba(106, 17, 203, 0.05)",
                  }),
                }}
              >
                <FormControlLabel
                  value={method.value}
                  control={<Radio sx={styles.radio} />}
                  label={method.label}
                  sx={{ flexGrow: 1 }}
                />
                <Avatar
                  sx={{
                    ...styles.paymentIcon,
                    background: method.color,
                    color: "white",
                  }}
                >
                  {method.icon}
                </Avatar>
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          sx={styles.placeOrderButton}
          onClick={handlePlaceOrder}
          fullWidth
          size="large"
          disabled={loading}
          endIcon={
            !loading && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          }
        >
          {loading
            ? "Đang xử lý..."
            : selectedPaymentMethod === "vnpay"
            ? "Thanh toán qua VNPay"
            : "Xác Nhận & Thanh Toán"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentGateways;
