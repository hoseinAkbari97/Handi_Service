import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// Leaflet
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Fake Data
const deviceTypes = ["یخچال", "ماشین لباسشویی", "تلویزیون", "جاروبرقی"];
const brands = ["سامسونگ", "ال‌جی", "اسنوا", "دوو"];
const problems = ["روشن نمی‌شود", "صدا می‌دهد", "عیب برق", "مشکل برد"];
const dates = ["امروز", "فردا", "پس‌فردا"];

export default function CreateRequest() {
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [problemType, setProblemType] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [description, setDescription] = useState("");

  const [markerPosition, setMarkerPosition] = useState([35.6892, 51.389]); // Tehran center

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return markerPosition ? <Marker position={markerPosition} /> : null;
  }

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
      {/* نوع دستگاه */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: "secondary.main",
              "&.Mui-focused": {
                color: "text.primary",
              },
            }}
          >
            نوع دستگاه
          </InputLabel>
          <Select
            value={deviceType}
            label="نوع دستگاه"
            sx={{
              bgcolor: "primary.main",
              "& .MuiSelect-icon": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "secondary.dark",
                },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.dark",
                borderWidth: "2px",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "primary.light",
                  "& .MuiMenuItem-root": {
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "secondary.dark",
                    color: "white",
                    "&:hover": {
                      bgcolor: "secondary.main",
                    },
                  },
                },
              },
            }}
            onChange={(e) => setDeviceType(e.target.value)}
          >
            {deviceTypes.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* برند */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: "secondary.main",
              "&.Mui-focused": {
                color: "text.primary",
              },
            }}
          >
            برند
          </InputLabel>
          <Select
            value={brand}
            label="برند"
            onChange={(e) => setBrand(e.target.value)}
            sx={{
              bgcolor: "primary.main",
              "& .MuiSelect-icon": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "secondary.dark",
                },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.dark",
                borderWidth: "2px",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "primary.light",
                  "& .MuiMenuItem-root": {
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "secondary.dark",
                    color: "white",
                    "&:hover": {
                      bgcolor: "secondary.main",
                    },
                  },
                },
              },
            }}
          >
            {brands.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* نوع مشکل */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: "secondary.main",
              "&.Mui-focused": {
                color: "text.primary",
              },
            }}
          >
            نوع مشکل
          </InputLabel>
          <Select
            value={problemType}
            label="نوع مشکل"
            onChange={(e) => setProblemType(e.target.value)}
            sx={{
              bgcolor: "primary.main",
              "& .MuiSelect-icon": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "secondary.dark",
                },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.dark",
                borderWidth: "2px",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "primary.light",
                  "& .MuiMenuItem-root": {
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "secondary.dark",
                    color: "white",
                    "&:hover": {
                      bgcolor: "secondary.main",
                    },
                  },
                },
              },
            }}
          >
            {problems.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* تاریخ */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="تاریخ مورد نظر"
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
                  // رنگ روزهای معمولی
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },

                  // امروز
                  "&.MuiPickersDay-today": {
                    borderColor: "secondary.main",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  },

                  // روز انتخاب‌شده
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "secondary.light",
                    "&:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  },
                },
              },

              // پنل انتخاب سال / ماه
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

      {/* شرح مشکل */}
      <Grid item xs={12}>
        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder="مشکل خود را با جزئیات توضیح دهید..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            bgcolor: "primary.main",
            "& .MuiSelect-icon": {
              color: "secondary.main",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "secondary.main",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "secondary.dark",
              },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "secondary.dark",
              borderWidth: "2px",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "primary.light",
                "& .MuiMenuItem-root": {
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: "secondary.dark",
                  color: "white",
                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                },
              },
            },
          }}
        />
      </Grid>

      {/* نقشه */}
      <Grid item xs={12}>
        <Typography sx={{ mb: 1 }}>محل انجام خدمت</Typography>

        <MapContainer
          center={[35.6892, 51.389]} // Tehran Default
          zoom={13}
          scrollWheelZoom={true}
          style={{
            height: "380px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </Grid>

      {/* دکمه */}
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "secondary.main",
            color: "#000",
            fontSize: "16px",
            py: 1.4,
            borderRadius: "10px",
            "&:hover": { bgcolor: "secondary.light" },
          }}
        >
          ثبت نهایی درخواست
        </Button>
      </Grid>
    </Box>
  );
}
