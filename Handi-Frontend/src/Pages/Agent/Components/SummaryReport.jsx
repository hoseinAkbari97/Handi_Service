import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// { title: "درآمد کل تیم", value: "۱۲۸M", change: "۱۵٪ افزایش" },
// { title: "تعداد کارها", value: "۴۵", change: "۸ کار بیشتر" },
// { title: "میانگین امتیاز", value: "۴.۸", change: "۰.۱ افزایش" },
// { title: "کارآمدی تیم", value: "۹۲٪", change: "۳٪ افزایش" },

export default function SummaryReport({ title, value, change, changeRate }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Card elevation={15}
        sx={{
          backgroundColor: "primary.main",
          color: "text.primary",
          borderRadius: 3,
          textAlign:"center",
          p: 2,
          minHeight:210,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", color:"text.secondary" }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ my: 1, fontWeight: "bold" }}>
            {value}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "success.light",
              fontSize: 14,
              gap: .5,
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 18, mr: 0.5 }} />
          <Typography>
          {change}
          </Typography>
            {changeRate}
          </Box>
          
        </CardContent>
      </Card>
    </Box>
  );
}
