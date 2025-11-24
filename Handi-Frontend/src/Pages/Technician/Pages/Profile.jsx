import {
  Box,
  Typography,
  Divider,
  Card,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { toPersianNumber } from "../../../Utils/NumberUtils";

export default function TechnicianEditProfile() {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    full_name: `${user.profile.first_name} ${user.profile.last_name}` || "",
    phone: user.profile.phone || "",
    email: user.profile.email || "",
    region: user.profile.address || "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const inputSX = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "secondary.main",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "secondary.dark",
    },
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      color: "secondary.dark",
    },
    "& .MuiInputLabel-root": {
      color: "secondary.main",
    },
  };

  return (
    <Box>
      {/* Profile Information */}
      <Card
        sx={{
          backgroundColor: "primary.main",
          borderRadius: 3,
          p: 3,
          textAlign: "center",
          color: "secondary.main",
        }}
      >
        <Avatar
          src={user.profile.profile_picture}
          sx={{
            width: 90,
            height: 91,
            border: "2px solid",
            borderColor: "secondary.main",
            mx: "auto",
            mb: 2,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user.profile.first_name} {user.profile.last_name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary", mt: 1 }}>
          تعمیرکار منطقه {user?.profile?.address || "(وارد نشده)"}
        </Typography>

        <Divider
          sx={{ backgroundColor: "secondary.dark", my: 2, opacity: 0.7 }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            color: "text.primary",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              {toPersianNumber(user.monthly_income)}
            </Typography>
            <Typography variant="body2">درآمد ماه جاری</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              {toPersianNumber(user.completed_jobs)}
            </Typography>
            <Typography variant="body2">کارهای انجام شده</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              ۳
            </Typography>
            <Typography variant="body2">سال سابقه</Typography>
          </Box>
        </Box>
      </Card>

      {/* Profile Form */}
      <Card
        sx={{
          backgroundColor: "primary.main",
          color: "text.primary",
          p: 3,
          borderRadius: 3,
          mt: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "secondary.main", mb: 4, fontWeight: "bold" }}
        >
          اطلاعات شخصی
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="name"
            label="نام و نام خانوادگی"
            value={formData.full_name}
            onChange={handleChange}
            fullWidth
            sx={inputSX}
          />
          <TextField
            name="phone"
            label="شماره تماس"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            sx={inputSX}
          />
          <TextField
            name="email"
            label="ایمیل"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            sx={inputSX}
          />
          <TextField
            name="region"
            label="منطقه تحت پوشش"
            value={formData.region}
            onChange={handleChange}
            fullWidth
            sx={inputSX}
          />
        </Box>

        {/* Button*/}

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{
            mt: 4,
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
          ذخیره تغییرات
        </Button>
      </Card>
    </Box>
  );
}
