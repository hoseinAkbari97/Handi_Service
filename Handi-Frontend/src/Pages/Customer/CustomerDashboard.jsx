import React from "react";
import { Box } from "@mui/material";
import ActiveRequestCard from "./Components/ActiveRequestCard";
import SummaryCard from "./Components/SummaryCard";
import TopTechnicians from "./Components/TopTechnicians";
import Header from "./Components/Header";
import Sidebar from "../../Layout/Sidebar";
import { UsersList } from "../../Datas";
import { TechniciansList } from "../../Datas";

export default function CustomerDashboard() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        gap:1
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
        <Sidebar role={UsersList[0].role} user={UsersList[0]} />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          overflowX:"hidden"
        }}
      >
        {/* Heaedr */}
        <Header />

        {/* Active Request */}
        <ActiveRequestCard />

        {/* Summary Section */}
        <Box
          mt={3}
          display="grid"
          gap={1}
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          }}
        >
          <SummaryCard iconType="requests" label="کل درخواست‌ها" value="۲۴" />
          <SummaryCard iconType="done" label="خدمات انجام‌شده" value="۱۸" />
          <SummaryCard
            iconType="wallet"
            label="موجودی کیف پول"
            value="۵۵۰,۰۰۰ تومان"
          />
          <SummaryCard iconType="points" label="امتیاز کلاب" value="۱۲۰" />
        </Box>

        {/* Top Technicians */}
        <TopTechnicians technicians={TechniciansList} />
      </Box>
    </Box>
  );
}
