import React from 'react'
import { Box, Button, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
          backgroundColor: "primary.main",
          color: "text.primary",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Handy Service
        </Typography>
        <Box>
          <Button color="secondary" variant="contained" sx={{ mx: 1 }}>
            ورود
          </Button>
          <Button color="secondary" variant="outlined" sx={{ mx: 1 }}>
            ثبت‌نام
          </Button>
        </Box>
      </Box>
  )
}
