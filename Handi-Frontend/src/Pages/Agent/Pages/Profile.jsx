import {
  Box,
  Typography,
  Divider,
  Card,
  Avatar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { UsersList } from "../../../Datas";

export default function Profile() {
  const [formData, setFormData] = useState(UsersList[2]);

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
          direction: "rtl",
        }}
      >
        <Avatar
          src={UsersList[2].avatar}
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
          {UsersList[2].name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.primary", mt: 1 }}>
          نماینده منطقه {UsersList[2].region}
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
              ۸
            </Typography>
            <Typography variant="body2">تکنسین</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              ۱۵۰
            </Typography>
            <Typography variant="body2">کار مدیریت شده</Typography>
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
            value={formData.name}
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
      </Card>
    </Box>
  );
}
