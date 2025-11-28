import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import ActiveRequestCard from "./Components/ActiveRequestCard";
import SummaryCard from "./Components/SummaryCard";
import TopTechnicians from "./Components/TopTechnicians";
import Header from "./Components/Header";
import Sidebar from "../../Layout/Sidebar";
import { UserContext } from "../../Contexts/UserContext";
import { toPersianNumber } from "../../Utils/NumberUtils";
import { Outlet } from "react-router-dom";

export default function CustomerDashboard() {
  const { user, reFetchUser } = useContext(UserContext);

  useEffect(() => {
    if (user && user.access) {
      const intervalId = setInterval(() => {
        reFetchUser();
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [user, reFetchUser]);



  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        در حال دریافت اطلاعات کاربری...
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        gap: 1,
      }}
    >
      {/* SideBar display: desktop & tablet */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <Sidebar role={user.profile.user_type} user={user} />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Heaedr */}
        <Header />

        <Outlet />
      </Box>
    </Box>
  );
}
