import React, { useState } from "react";
import { Box, IconButton, Button, Typography, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../../Layout/Sidebar";

export default function Header() {
  const [open, setOpen] = useState(false);

  const user = {
    name: "عرفان نشاطی",
    role: "customer",
    avatar: "https://i.pravatar.cc/500?img=12",
  };


  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            backgroundColor: "#004d40",
            color: "#fff",
            "&:hover": { backgroundColor: "#00695c" },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer */}
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Sidebar role="customer" user={user} onClose={() => setOpen(false)} />
        </Drawer>

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
  );
}
