import React from 'react'
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "primary.main", color: "text.primary", py: 3, textAlign: "center" }}>
    <Typography variant="body2">© 2025 Handy Service — تمامی حقوق محفوظ است.</Typography>
  </Box>
  )
}
