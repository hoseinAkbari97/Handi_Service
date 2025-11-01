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
import DetailsTable from "../Components/DetailsTable"

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

      {/* Summary Reports */}
      <Box sx={{
        display:"grid" ,
        justifyContent:"center",
        alignItems:"center",
        mb: 3,
        gap:1,
        gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))"
      }}>
        <SummaryReport
          title="درآمد کل تیم"
          value="۱۲۸M"
          change="افزایش"
          changeRate={"۱۵٪"}
        />
        <SummaryReport
          title="تعداد کارها"
          value="۴۵"
          change="کار بیشتر"
          changeRate={"۸"}
        />
        <SummaryReport
          title="میانگین امتیاز"
          value="۴.۸"
          change="افزایش"
          changeRate={"۰.۱"}
        />
        <SummaryReport
          title="کارآمدی تیم"
          value="۹۲٪"
          change="افزایش"
          changeRate={"۳٪"}
        />
      </Box>

      {/* Table Section */}
      <DetailsTable/>
    </Box>
  );
}
