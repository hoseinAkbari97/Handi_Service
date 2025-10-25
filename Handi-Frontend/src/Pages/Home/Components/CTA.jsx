import React from 'react'
import { Box, Button, Typography } from "@mui/material";

export default function CTA() {
  return (
    <Box sx={{ py: 6, textAlign: "center", backgroundColor: "secondary.main", color: "primary.main" }}>
    <Typography variant="h5" fontWeight="bold" mb={2}>
      آماده درخواست سرویس جدید هستید؟
    </Typography>
    <Button variant="contained" color="primary" size="large">
      ثبت درخواست فوری
    </Button>
  </Box>
  )
}
