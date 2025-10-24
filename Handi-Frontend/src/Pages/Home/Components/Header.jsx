import React from 'react'
import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

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
        <Box>
          <Link to="/login">
          <Button color="secondary" variant="contained" sx={{ mx: 1 }}>
            ورود
          </Button>
          </Link>
          
          <Button color="secondary" variant="outlined" sx={{ mx: 1 }}>
            ثبت‌نام
          </Button>
        </Box>
        <Typography variant="h6" fontWeight="bold" color="text.secondary">
          Handi Service
        </Typography>
      </Box>
  )
}
