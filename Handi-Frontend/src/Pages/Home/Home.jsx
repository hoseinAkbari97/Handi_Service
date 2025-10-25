import React from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import PopularService from "./Components/PopularService";
import WhyUs from "./Components/WhyUs";
import CTA from "./Components/CTA";
import Footer from "./Components/Footer";

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

      {/* CTA */}
      <Box>
        <CTA />
      </Box>

      {/* Footer */}
      <Box>
        <Footer />
      </Box>

    </Box>
  );
}
