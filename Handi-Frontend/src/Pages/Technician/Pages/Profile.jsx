import {
  Box,
  Typography,
  Divider,
  Card,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { toPersianNumber } from "../../../Utils/NumberUtils";
import { API_CONFIG } from "../../../config/api";

export default function TechnicianEditProfile() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    first_name: user.profile.first_name || "",
    last_name: user.profile.last_name || "",
    phone: user.profile.phone || "",
    email: user.profile.email || "",
    region: user.profile.address || "",
  });

    useEffect(() => {
      if (!user || !user.access) {
        setLoading(false);
        setError("اطلاعات کاربری موجود نیست.");
        return;
      }
  
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(API_CONFIG.endpoints.technicianDashboard.getProfile, {
            headers: { Authorization: `Bearer ${user.access}` },
          });
  
          if (!response.ok) {
            throw new Error("خطا در دریافت اطلاعات پروفایل.");
          }
  
          const data = await response.json();
          setUserData(data);
          console.log(data);
          
  
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            city: data.city || "",
            email: data.email || "",
            address: data.address || "",
          });
        } catch (e) {
          console.error("Fetch error:", e);
          setError(e.message || "خطای ناشناخته در دریافت داده.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(
        API_CONFIG.endpoints.customerDashboard.getProfile,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "خطا در ذخیره تغییرات.");
      }

      setUserData((prev) => ({ ...prev, ...formData }));
      alert("تغییرات با موفقیت ذخیره شد!");
    } catch (e) {
      console.error("Submit error:", e);
      setError(e.message || "خطای ناشناخته در ذخیره داده.");
    } finally {
      setIsSubmitting(false);
    }
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

    if (loading) {
    return <Typography sx={{ mt: 4 }}>در حال بارگذاری اطلاعات...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        خطا: {error}
      </Typography>
    );
  }
  const profileData = userData || user.profile;

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
          src={profileData?.profile_picture}
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
          {profileData.first_name} {profileData.last_name}
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
            name="first_name"
            label="نام"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            sx={inputSX}
          />

          <TextField
            name="last_name"
            label="نام خانوادگی"
            value={formData.last_name}
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
            name="city"
            label="شهر"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            sx={inputSX}
          />
          <TextField
            name="address"
            label="منطقه تحت پوشش"
            value={formData.address}
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
          onClick={handleSubmit}
          disabled={isSubmitting}
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
          {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </Card>
    </Box>
  );
}
