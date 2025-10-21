import React from 'react'
import { Box, IconButton, Button, Typography } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";

export default function Header() {
  return (
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon sx={{ color: "#0A3D3F" }} />
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 1.5 }}
          >
            درخواست تعمیر جدید
          </Button>
        </Box>
        <Typography variant="h6" fontWeight="bold" color="primary">
          داشبورد
        </Typography>
      </Box>
  )
}
