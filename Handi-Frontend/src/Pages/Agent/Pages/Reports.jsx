import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import theme from "../../../Theme/Theme";
import SummaryReport from "../Components/SummaryReport";
import Filter from "../Components/Filter";

export default function Reports() {
  return (
    <Box sx={{ p: 3, direction: "rtl", backgroundColor: "background.default" }}>
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: theme.palette.primary.main,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        گزارش‌گیری تیم
      </Typography>

      {/* Filters Section */}
      <Filter />


    </Box>
  );
}
