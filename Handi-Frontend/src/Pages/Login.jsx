import React, { use, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

export default function Login() {
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("login");
  const [code, setCode] = useState("");

  const phoneRegex = /^(?:(?:\+98|0098)9\d{9}|09\d{9})$/;
  const isValid = phoneRegex.test(phone);

  const roleChange = (event) => {
    setRole(event.target.value);
  };

  const phoneHandler = (event) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let value = event.target.value.trim();

    persianDigits.forEach((d, i) => {
      value = value.replaceAll(d, englishDigits[i]);
    });

    setPhone(value);
  };

  const stepHandler = () => {
    console.log("کد تأیید برای", phone, "ارسال شد");
    setStep("verify");
  };

  const codeHandler = (event) => {
    setCode(event.target.value);
  };

  const verifyHandler = () => {
    if (code === "1234") {
      console.log("ورود با موفقیت انجام شد");
    } else {
      console.log("کد تأیید اشتباه است");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#F5F2F0" }}
    >
      <Paper
        elevation={5}
        sx={{ p: 4, width: 350, borderRadius: 3, backgroundColor: "#F0E4DD" }}
      >
        <Box display={"flex"} justifyContent={"center"} sx={{ mb: 2 }}>
          <img
            src="../../public/pictures/Handi-Logo.png"
            alt="Logo"
            height={150}
            sx={{}}
          />
        </Box>
        <Typography variant="h5" gutterBottom align="center">
          سیستم تعمیرات لوازم خانگی
        </Typography>

        {step === "login" ? (
          <>
            <Typography variant="body1" gutterBottom align="center">
              ورود به حساب کاربری
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                ورود به عنوان
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="ورود به عنوان"
                onChange={roleChange}
              >
                <MenuItem value={"Customer"}>کاربر</MenuItem>
                <MenuItem value={"Technicians"}>تکنسین</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="شماره موبایل"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={phoneHandler}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isValid || phone.length === 0 || !role}
              onClick={stepHandler}
              sx={{ mt: 2, py: 1.2 }}
            >
              ارسال کد تأیید
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              حساب کاربری ندارید؟ <a href="/register">ثبت‌نام</a>
            </Typography>

            <Paper sx={{ mt: 4 }} elevation={5}>
              <Typography align="center" p={3}>
                اطلاعات ورود آزمایشی <br />
                شماره موبایل دلخواه + کد تأیید ۱۲۳۴
              </Typography>
            </Paper>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom align="center">
              کد تأیید ارسال شده را وارد نمائید
            </Typography>

            <TextField
              label="کد تأیید پیامک شده"
              variant="outlined"
              fullWidth
              margin="normal"
              value={code}
              onChange={codeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={verifyHandler}
              sx={{ mt: 2, py: 1.2 }}
            >
              ورود
            </Button>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => setStep("login")}
              sx={{ mt: 2, py: 1.2 }}
            >
              ویرایش شماره وارد شده
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
