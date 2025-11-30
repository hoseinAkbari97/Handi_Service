import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import {
  Star,
  SupportAgent,
  Bolt,
  WorkspacePremium,
} from "@mui/icons-material";

export default function WhyUs() {
  return (
    <Box sx={{ backgroundColor: "primary.main", py: 6 }}>
      <Container>
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          mb={4}
          color="secondary.main"
        >
          چرا Handi Service؟
        </Typography>
        <Box sx={{ display: "flex", gap: 5, justifyContent: "space-around" }}>
          {[
            {
              icon: <SupportAgent fontSize="large" />,
              text: "پشتیبانی ۲۴ ساعته",
            },
            { icon: <Bolt fontSize="large" />, text: "اعزام سریع تکنسین" },
            {
              icon: <WorkspacePremium fontSize="large" />,
              text: "تضمین کیفیت خدمات",
            },
            { icon: <Star fontSize="large" />, text: "امتیاز بالای مشتریان" },
          ].map((item, i) => (
            <Box
              key={i}
              sx={{
                color: "secondary.main",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems:"center"
              }}
            >
              {item.icon}
              <Typography mt={1} color="text.primary">
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
