import React from "react";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Header from "./Components/Header";
import { Build, Star, SupportAgent, Bolt, WorkspacePremium } from "@mui/icons-material";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "background.default", color: "text.contrastText", minHeight: "100vh" }}>
      
      {/* Header */}
      <Box>
        <Header/>
      </Box>

      
    </Box>
  );
}
