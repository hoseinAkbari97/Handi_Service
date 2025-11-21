import React from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";
// import { UsersList } from "../../Datas";
import Sidebar from "../../Layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function AgentDashboard() {
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
        <Sidebar user={UsersList[2]}/>
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