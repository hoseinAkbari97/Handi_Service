import React from "react";
import { Box } from "@mui/material";
import ActiveRequestCard from "./Components/ActiveRequestCard";
import SummaryCard from "./Components/SummaryCard";
import TopTechnicians from "./Components/TopTechnicians";
import Header from "./Components/Header";
import Technicians from "../../Datas";

export default function CustomerDashboard() {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", p: 2 }}>

      {/* Heaedr */}
      <Header />

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
        <TopTechnicians technicians={Technicians} />
    </Box>
  );
}
