import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import ActiveRequestCard from "./Components/ActiveRequestCard";
import SummaryCard from "./Components/SummaryCard";
import TopTechnicians from "./Components/TopTechnicians";
import Header from "./Components/Header";
import Sidebar from "../../Layout/Sidebar";
import Technicians from "../../Datas";

export default function CustomerDashboard() {
  const [open, setOpen] = useState(false);

  const technicians = Technicians

  return (
    <Box sx={{ backgroundColor: "#F5EDE1", minHeight: "100vh", p: 2 }}>

      {/* Heaedr */}
      <Header />

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Sidebar onClose={() => setOpen(false)} />
      </Drawer>

      {/* Active Request */}
      <ActiveRequestCard />

      {/* Summary Section */}
      <Box mt={3} display="grid" gap={1}>
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
        <TopTechnicians technicians={technicians} />
    </Box>
  );
}
