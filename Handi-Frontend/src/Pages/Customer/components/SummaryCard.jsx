import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// props: iconType, label, value
export default function SummaryCard({ iconType, label, value }) {
  const theme = useTheme();

  // انتخاب آیکون بر اساس نوع کارت
  const getIcon = () => {
    switch (iconType) {
      case "requests":
        return <AssignmentIcon sx={{ fontSize: 36, color: theme.palette.secondary.main }} />;
      case "done":
        return <CheckCircleIcon sx={{ fontSize: 36, color: theme.palette.secondary.main }} />;
      case "wallet":
        return <AccountBalanceWalletIcon sx={{ fontSize: 36, color: theme.palette.secondary.main }} />;
      case "points":
        return <EmojiEventsIcon sx={{ fontSize: 36, color: theme.palette.secondary.main }} />;
      default:
        return <AssignmentIcon sx={{ fontSize: 36, color: theme.palette.secondary.main }} />;
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
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
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
