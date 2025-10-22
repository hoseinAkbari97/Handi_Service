import React from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";

export default function CustomerDashboard() {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", p: 2 }}>

      {/* Heaedr */}
      <Header />

    </Box>
  );
}