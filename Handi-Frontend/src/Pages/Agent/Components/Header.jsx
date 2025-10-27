import React, { useState } from "react";
import { Box, IconButton, Typography, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../../Layout/Sidebar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UsersList } from "../../../Datas";

export default function Header() {
  const [open, setOpen] = useState(false);

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
            display:{xs:"flex", sm:"none"},
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
        پنل نماینده
      </Typography>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} sx={{display:{xs:"block", sm:"none"} }} >
        <Sidebar role={UsersList[2].role} user={UsersList[2]} onClose={() => setOpen(false)} />
      </Drawer>
    </Box>
  );
}
