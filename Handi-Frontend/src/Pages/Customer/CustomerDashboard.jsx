import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import Sidebar from "./components/Sidebar";
import ActiveRequestCard from "./components/ActiveRequestCard";
import SummaryCard from "./components/SummaryCard";
import RecentRequestsChart from "./components/RecentRequestsChart";
import TopTechnicians from "./components/TopTechnicians";
import Header from "./Components/Header";

export default function CustomerDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ backgroundColor: "#F5EDE1", minHeight: "100vh", p: 2 }}>
      <Header />
      

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Sidebar onClose={() => setOpen(false)} />
      </Drawer>

      {/* Active Request */}
      <ActiveRequestCard />

      {/* Summary Section */}
      <Box mt={3} display="grid" gap={2}>
        <SummaryCard icon="📋" label="کل درخواست‌ها" value="۲۴" />
        <SummaryCard icon="✅" label="خدمات انجام‌شده" value="۱۸" />
        <SummaryCard icon="💰" label="موجودی کیف پول" value="۵۵۰,۰۰۰ تومان" />
        <SummaryCard icon="🪙" label="امتیاز کلاب" value="۱۲۰" />
      </Box>

      {/* Chart & Technicians */}
      <Box mt={3}>
        <RecentRequestsChart />
        <TopTechnicians />
      </Box>
    </Box>
  );
}
