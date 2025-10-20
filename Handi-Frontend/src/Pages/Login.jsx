import React, { useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("login");
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const phoneRegex = /^(?:(?:\+98|0098)9\d{9}|09\d{9})$/;
  const isValid = phoneRegex.test(phone);

  const convertToEnglishDigits = (value) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let result = value;
    persianDigits.forEach((d, i) => {
      result = result.replaceAll(d, englishDigits[i]);
    });
    return result;
  };

  const roleChange = (event) => {
    setRole(event.target.value);
  };

  const phoneHandler = (event) => {
    setPhone(convertToEnglishDigits(event.target.value.trim()));
  };

  const stepHandler = () => {
    console.log("کد تأیید برای", phone, "ارسال شد");
    setStep("verify");
  };

  const codeHandler = (event) => {
    const normalizedCode = convertToEnglishDigits(event.target.value.trim());
    setCode(normalizedCode);
  };

  const verifyHandler = () => {
    if (code === "1234") {
      if (role === "Customer") navigate("/customer");
      else if (role === "Technicians") navigate("/technicians");
    } else {
      alert("کد تأیید اشتباه است");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "background" }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
          backgroundColor: "primary.main",
          border: "solid 2px",
          borderColor: "secondary.main",
        }}
      >
        <Box display={"flex"} justifyContent={"center"} sx={{ mb: 2 }}>
          <img
            src="../../public/pictures/Handi-Logo.png"
            alt="Logo"
            height={150}
            sx={{ color: "#fff" }}
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
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  // ⚪ تغییر رنگ Label در حالت عادی
                  color: "secondary.main",
                  // 🔵 تغییر رنگ Label در حالت فوکوس (Mui-focused)
                  "&.Mui-focused": {
                    color: "secondary.dark",
                  },
                }}
              >
                ورود به عنوان
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="ورود به عنوان"
                onChange={roleChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "secondary.dark",
                    },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.dark",
                    borderWidth: "2px", // 👈 حتماً ضخامت را تعریف کنید!
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "primary.dark",
                      "& .MuiMenuItem-root": {
                        color: "text.primary",
                        "&:hover": {
                          backgroundColor: "secondary.dark",
                        },
                      },
                    },
                  },
                }}
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
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "secondary.dark",
                  },
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  color: "secondary.dark",
                },
                "& .MuiInputLabel-root": {
                  color: "secondary.main",
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isValid || phone.length === 0 || !role}
              onClick={stepHandler}
              sx={{
                mt: 2,
                py: 1.2,
                "&.MuiButton-containedPrimary": {
                  backgroundColor: "secondary.main", // 👈 استفاده از رنگ اصلی تم برای پس‌زمینه
                  color: "text", // 👈 استفاده از رنگ سفید برای متن
                },
                "&.MuiButton-containedPrimary:hover": {
                  backgroundColor: "secondary.light", // 👈 کمی تیره‌تر در حالت Hover
                },
                "&.Mui-disabled": {
                  backgroundColor: "secondary.dark", // 👈 رنگ پس‌زمینه دلخواه شما (مثلاً یک خاکستری روشن)
                  color: "text.contrastText", // 👈 رنگ متن دکمه در حالت Disabled
                },
              }}
            >
              ارسال کد تأیید
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              حساب کاربری ندارید؟{" "}
              <Typography
                variant="body2"
                component={Link}
                to="/register"
                color="text.primary"
                sx={{
                  textDecoration: "none", 
                  "&:hover": {
                    color: "secondary.light"
                  },
                }}
              >
                ثبت نام کنید
              </Typography>
            </Typography>

            <Paper sx={{ mt: 4 }} elevation={5}>
              <Typography align="center" variant="body2" p={3} color="text.contrastText">
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
