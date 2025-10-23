import React, { useState } from "react";
import { Box, IconButton, Button, Typography, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../../Layout/Sidebar";
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

        {/* display: desktop & tablet */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 1.5, display: { xs: "none", sm: "flex" } }}
        >
          درخواست تعمیر جدید
        </Button>

        {/* display: Mobile*/}
        <IconButton
          sx={{
            display: { xs: "flex", sm: "none" },
            backgroundColor: "secondary.main",
            color: "primary.main",
            "&:hover": { backgroundColor: "secondary.dark" },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" fontWeight="bold" color="primary">
        پنل مشتری
      </Typography>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} sx={{display:{xs:"block", sm:"none"} }} >
        <Sidebar role={UsersList[0].role} user={UsersList[0]} onClose={() => setOpen(false)} />
      </Drawer>
    </Box>
  );
}
