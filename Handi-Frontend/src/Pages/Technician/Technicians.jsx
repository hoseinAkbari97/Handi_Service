import React from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";
import SummaryCard from "./Components/SummaryCard";
import Requests from "./Components/Requests";
import {RequestsList} from "../../Datas";

export default function TechniciansDashboard() {
  return (
    <Box
      sx={{ backgroundColor: "background.default", minHeight: "100vh", p: 2 }}
    >
      {/* Heaedr */}
      <Header />

      {/* Summary Section */}
      <Box mt={3} display="grid" gap={1}>
        <SummaryCard iconType="workDone" label="کارهای انجام شده" value="۱۲" />
        <SummaryCard
          iconType="Income"
          label="درآمد این ماه"
          value="۴,۵۰۰,۰۰۰ تومان"
        />
        <SummaryCard iconType="rate" label="میانگین امتیاز" value="۴.۹" />
        <SummaryCard
          iconType="clock"
          label="میانگین زمان پاسخگویی"
          value="۲۵ دقیقه"
        />
      </Box>

      {/* Income Chart */}


      {/* New Requests */}
      <Requests requests={RequestsList} />

    </Box>
  );
}
