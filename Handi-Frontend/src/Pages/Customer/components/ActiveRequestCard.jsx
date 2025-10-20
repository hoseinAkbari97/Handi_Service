import { Box, Typography, Button } from "@mui/material";

export default function ActiveRequestCard() {
  return (
    <Box
      sx={{
        backgroundColor: "#0A3D3F",
        color: "#fff",
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        درخواست فعال شما
      </Typography>
      <Typography>🧊 تعمیر یخچال فریزر سامسونگ</Typography>
      <Typography sx={{ mt: 1 }}>👨‍🔧 تعمیرکار: علی رضایی</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        هزینه: ۲۵۰,۰۰۰ تومان
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2, borderRadius: 2 }}>
        پرداخت هزینه
      </Button>
    </Box>
  );
}