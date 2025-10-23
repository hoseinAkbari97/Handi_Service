import React, { useState } from "react";
import { Box, IconButton, Button, Typography, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../../Layout/Sidebar";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Header() {
  const [open, setOpen] = useState(false);

  const user = {
    name: "محمد محمدی",
    role: "technician",
    avatar: "https://i.pravatar.cc/500?img=52",
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
            backgroundColor: "primary.main",
            color: "secondary.main",
            "&:hover": { backgroundColor: "primary.light" },
          }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>

      <Typography variant="h6" fontWeight="bold" color="primary">
        پنل تعمیرکار
      </Typography>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Sidebar role={user.role} user={user} onClose={() => setOpen(false)} />
      </Drawer>
    </Box>
  );
}
