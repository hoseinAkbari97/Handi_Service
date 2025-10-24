import React from 'react'
import { Box, Button, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <div><Box
    sx={{
      textAlign: "center",
      py: 10,
      backgroundImage: "url('/pictures/hero-bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <Typography variant="h3" fontWeight="bold" color="primary.main" mb={2}>
      تعمیرات سریع و مطمئن لوازم خانگی شما
    </Typography>
    <Typography variant="h6" color="text.secondary" mb={3}>
      از بهترین تکنسین‌ها خدمات باکیفیت دریافت کنید
    </Typography>
    <Button variant="contained" color="primary" size="large">
      ثبت درخواست تعمیر
    </Button>
  </Box></div>
  )
}
