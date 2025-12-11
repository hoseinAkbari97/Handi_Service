import React, { useContext, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

import dayjs from "dayjs";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

import ServiceSelection from "../Components/ServiceSelection";
import MapInput from "../Components/MapInput";
import SelectDate from "../Components/SelectDate";
import { UserContext } from "../../../Contexts/UserContext";

//  Fake Data
const deviceTypes = ["یخچال", "ماشین لباسشویی", "تلویزیون", "جاروبرقی"];
const brands = ["سامسونگ", "ال‌جی", "اسنوا", "دوو"];
const problems = ["روشن نمی‌شود", "صدا می‌دهد", "ایراد برقی", "مشکل برد"];

export default function CreateRequest() {
  const { user } = useContext(UserContext);
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [problemType, setProblemType] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().calendar("jalali"));
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(["35.6892", "51.389"]);

  const handleSubmit = () => {
    fetch("http://127.0.0.1:8000/api/service/requests/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        device_type: deviceType,
        brand: brand,
        problem_type: problemType,
        preferred_date: selectedDate.format("YYYY-MM-DD"),
        preferred_time: null,
        description: description,
        full_address: address,
        latitude: markerPosition[0],
        longitude: markerPosition[1],
      }),
    })
    .then(async (response) => {
      const data = await response.json(); 
        
        if (!response.ok) {
          console.error("--- Server Validation Error Details (400) ---", data);
          let errorMsg = "خطا در ثبت درخواست. لطفاً مطمئن شوید همه فیلدهای اجباری پر شده‌اند.";
            if (data && typeof data === 'object') {
              errorMsg += "\nجزئیات خطا را در کنسول ببینید.";
            }
            alert(errorMsg);
            
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return data;
    })
    .then((data) => {
        alert("درخواست شما با موفقیت ثبت شد!");
    })
    .catch((error) => {
        console.error("Fetch/Network Error:", error);
    });
  };

    // console.log("Request Data:", {
    //   deviceType,
    //   brand,
    //   problemType,
    //   selectedDate: selectedDate.format("YYYY/MM/DD"),
    //   description,
    //   address,
    //   latitude: markerPosition[0],
    //   longitude: markerPosition[1],
    // });
    // alert("درخواست شما ثبت شد! (Console.log)");
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.light",
        gap: 2,
        minHeight: "100vh",
        p: 2,
        borderRadius: 4,
        boxShadow: "5",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        align="center"
        sx={{ mb: 1, color: "secondary.main" }}
      >
        ثبت درخواست تعمیر
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
      <SelectDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

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
