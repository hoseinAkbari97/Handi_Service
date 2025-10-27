import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarIcon from '@mui/icons-material/Star';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

// props: iconType, label, value
export default function SummaryCard({ iconType, label, value }) {
  const theme = useTheme();
  
  const getIcon = () => {
    switch (iconType) {
      case "workDone":
        return <FactCheckIcon sx={{ fontSize: 50, color: "secondary.main" }} />;
      case "Income":
        return <MonetizationOnIcon sx={{ fontSize: 50, color: "secondary.main" }} />;
      case "rate":
        return <StarIcon sx={{ fontSize: 50, color: "secondary.main" }} />;
      case "clock":
        return <WatchLaterIcon sx={{ fontSize: 50, color: "secondary.main" }} />;
      default:
        return <FactCheckIcon sx={{ fontSize: 50, color: "secondary.main" }} />;
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2.5,
        borderRadius: 3,
        backgroundColor: "primary.main",
        color: "text.primary",
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
        },
      }}
    >
      {/* Left Side (Value + Label) */}
      <Box m={.75}>
      <Typography variant="body1">{label}</Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: theme.palette.secondary.main }}
        >
          {value}
        </Typography>
      </Box>

      {/* Right Side (Icon) */}
      <Box>{getIcon()}</Box>
    </Paper>
  );
}
