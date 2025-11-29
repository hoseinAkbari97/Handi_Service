import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  ThemeProvider,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

import ServiceSelection from "../Components/ServiceSelection";
import MapInput from "../Components/MapInput";

//  Fake Data
const deviceTypes = ["یخچال", "ماشین لباسشویی", "تلویزیون", "جاروبرقی"];
const brands = ["سامسونگ", "ال‌جی", "اسنوا", "دوو"];
const problems = ["روشن نمی‌شود", "صدا می‌دهد", "عیب برق", "مشکل برد"];

export default function CreateRequest() {
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [problemType, setProblemType] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().calendar("jalali"));
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState([35.6892, 51.389]); // مرکز تهران

  const handleSubmit = () => {
    console.log("Request Data:", {
      deviceType,
      brand,
      problemType,
      selectedDate: selectedDate.format("YYYY/MM/DD"),
      description,
      address,
      latitude: markerPosition[0],
      longitude: markerPosition[1],
    });
    alert("درخواست شما ثبت شد! (اطلاعات در کنسول نمایش داده شده است)");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.light",
        gap: 2,
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        align="center"
        sx={{ mb: 1, color: "secondary.dark" }}
      >
        ثبت درخواست خدمات فنی
      </Typography>

      {/* Select Service */}
      <ServiceSelection
        deviceType={deviceType}
        setDeviceType={setDeviceType}
        brand={brand}
        setBrand={setBrand}
        problemType={problemType}
        setProblemType={setProblemType}
        deviceTypes={deviceTypes}
        brands={brands}
        problems={problems}
      />

      {/* Select Date */}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fa">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="تاریخ مورد نظر"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            calendar="jalali"
            format="YYYY/MM/DD"
            sx={{
              borderRadius: "5px",
              width: "100%",
              bgcolor: "primary.main",
              "& .MuiIconButton-root": {
                color: "secondary.main",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "text.primary",
              },
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 2px",
                  borderColor: "secondary.main",
                },
              },
            }}
            slotProps={{
              desktopPaper: {
                sx: {
                  borderRadius: 4,
                  backgroundColor: "primary.light",
                  border: "solid 1px",
                  borderColor: "secondary.dark",
                },
              },

              calendarHeader: {
                sx: {
                  "& .MuiIconButton-root": {
                    color: "secondary.main",
                  },
                  "& .MuiIconButton-root:hover": {
                    backgroundColor: "secondary.main",
                    color: "text.primary",
                  },
                  "& .MuiIconButton-root": {
                    color: "text.primary",
                  },
                  "& .MuiPickersCalendarHeader-label": {
                    color: "text.primary",
                  },
                },
              },

              day: {
                sx: {
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },

                  "&.MuiPickersDay-today": {
                    borderColor: "secondary.main",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  },

                  "&.Mui-selected": {
                    backgroundColor: "primary.main",

                    color: "secondary.light",

                    "&:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  },
                },
              },

              toolbar: {
                sx: {
                  "& .MuiPickersToolbar-title": {
                    color: "primary.main",
                  },
                },
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      {/* Description */}
      <TextField
        multiline
        minRows={4}
        fullWidth
        label="مشکل خود را با جزئیات توضیح دهید..."
        placeholder="شرح کامل مشکل..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
      />

      {/* Address */}
      <TextField
        multiline
        minRows={2}
        fullWidth
        label="آدرس دقیق"
        placeholder="آدرس دقیق جهت اعزام کارشناس"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Map Select */}
      <Box>
        <Typography sx={{ mb: 1 }}>
          محل انجام خدمت (روی نقشه کلیک کنید)
        </Typography>
        <MapInput
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
      </Box>

      {/* Submit Button */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2, py: 1.2 }}
      >
        ثبت نهایی درخواست
      </Button>
    </Box>
  );
}
