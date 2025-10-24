import React from "react";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import PopularService from "./Components/PopularService";
import WhyUs from "./Components/WhyUs";
import { Build, Star, SupportAgent, Bolt, WorkspacePremium } from "@mui/icons-material";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "background.default", color: "text.contrastText", minHeight: "100vh" }}>
      
      {/* Header */}
      <Box>
        <Header/>
      </Box>

      {/* Hero Section */}
      <Box>
        <HeroSection />
      </Box>

      {/* Popular service */}
      <Box>
        <PopularService />
      </Box>

      {/* Why us? */}
      <Box>
        <WhyUs />
      </Box>

    </Box>
  );
}
