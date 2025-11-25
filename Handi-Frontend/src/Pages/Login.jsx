import React, { useState, useContext } from "react";
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
import { useNavigate, Link, data } from "react-router-dom";
import HandymanIcon from "@mui/icons-material/Handyman";
import { UserContext } from "../Contexts/UserContext";
import { toEnglishNumber } from "../Utils/NumberUtils";

export default function Login() {
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("login");
  const [verifyOTP, setVerifyOTP] = useState("");

  const navigate = useNavigate();

  const phoneRegex = /^(?:(?:\+98|0098)9\d{9}|09\d{9})$/;
  const isValid = phoneRegex.test(phone);

  const { requestOTP, verifyAndLogin } = useContext(UserContext);

  const roleChange = (event) => {
    setRole(event.target.value);
  };

  const phoneHandler = (event) => {
    setPhone(toEnglishNumber(event.target.value.trim()));
  };

  const codeHandler = (event) => {
    setVerifyOTP(toEnglishNumber(event.target.value.trim()));
  };

  const stepHandler = () => {
    requestOTP(phone)
      .then(() => {
        setStep("verify");
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const verifyHandler = () => {
    verifyAndLogin(phone, verifyOTP, role)
      .then((redirectPath) => {
        navigate(redirectPath);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <HandymanIcon sx={{ height: 110, width: 110, mb: 3 }} />
        </Box>
        <Typography variant="h5" gutterBottom align="center">
          سیستم تعمیرات لوازم خانگی
        </Typography>

        {step === "login" ? (
          <>
            <Typography variant="body1" gutterBottom align="center" mb={4}>
              ورود به حساب کاربری
            </Typography>

            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: "secondary.main",
                  "&.Mui-focused": {
                    color: "secondary.dark",
                  },
                }}
              >
                ورود به عنوان
              </InputLabel>
              <Select
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
                    borderWidth: "2px",
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
                <MenuItem value={"customer"}>کاربر</MenuItem>
                <MenuItem value={"technician"}>تکنسین</MenuItem>
                <MenuItem value={"agent"}>نماینده</MenuItem>
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
                color: "primary.main",
                "&.MuiButton-containedPrimary": {
                  backgroundColor: "secondary.main",
                  color: "text",
                },
                "&.MuiButton-containedPrimary:hover": {
                  backgroundColor: "secondary.light",
                },
                "&.Mui-disabled": {
                  backgroundColor: "secondary.dark",
                  color: "text.contrastText",
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
                    color: "secondary.light",
                  },
                }}
              >
                ثبت نام کنید
              </Typography>
            </Typography>

            <Paper sx={{ mt: 4 }} elevation={5}>
              <Typography
                align="center"
                variant="body2"
                p={3}
                color="text.contrastText"
              >
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
              value={verifyOTP}
              onChange={codeHandler}
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
              color="secondary"
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
