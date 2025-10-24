import React from 'react'
import { Box, Container, Grid, Typography } from "@mui/material";
import { Star, SupportAgent, Bolt, WorkspacePremium } from "@mui/icons-material";

export default function WhyUs() {
  return (
    <Box sx={{ backgroundColor: "primary.main", py: 6 }}>
    <Container>
      <Typography variant="h5" align="center" fontWeight="bold" mb={4} color="secondary.main">
        چرا Handy Service؟
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {[
          { icon: <SupportAgent fontSize="large" />, text: "پشتیبانی ۲۴ ساعته" },
          { icon: <Bolt fontSize="large" />, text: "اعزام سریع تکنسین" },
          { icon: <WorkspacePremium fontSize="large" />, text: "تضمین کیفیت خدمات" },
          { icon: <Star fontSize="large" />, text: "امتیاز بالای مشتریان" },
        ].map((item, i) => (
          <Grid item xs={6} sm={3} key={i} textAlign="center">
            <Box color="secondary.main">{item.icon}</Box>
            <Typography mt={1} color="text.primary">
              {item.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
  )
}
