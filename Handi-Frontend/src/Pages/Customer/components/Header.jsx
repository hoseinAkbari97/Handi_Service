import React, { useState, useEffect } from "react";
import { Box, IconButton, Button, Typography, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../../Layout/Sidebar";
// import { UsersList } from "../../../Datas";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const users = await UsersList();
  //       setUser(users[0]);
  //     } catch (error) {
  //       console.error("Error Log in get users:", error);
  //     }
  //   }
  //   fetchUser();
  // }, []);


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
          sx={{ borderRadius: 1.5, gap:1, display: { xs: "none", sm: "flex" } }}
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
      <Typography variant="h6" fontWeight="bold" color="primary" ml={2}>
        پنل مشتری
      </Typography>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} sx={{display:{xs:"block", sm:"none"} }} >
        {user? (<Sidebar role={user.role} user={user} onClose={() => setOpen(false)} />) : (<Box sx={{ p: 4, textAlign: "center", color:"text.contrastText" }}>در حال بارگذاری...</Box>)}
      </Drawer>
    </Box>
  );
}
