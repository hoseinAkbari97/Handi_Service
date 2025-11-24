import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Build as BuildIcon,
  Wallet as WalletIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ user, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isValid");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = {
    customer: [
      { text: "داشبورد", icon: <HomeIcon />, path: "/customer" },
      {
        text: "درخواست‌های من",
        icon: <AssignmentIcon />,
        path: "/customer/requests",
      },
      {
        text: "تعمیرکاران",
        icon: <BuildIcon />,
        path: "/customer/technicians",
      },
      { text: "کیف پول", icon: <WalletIcon />, path: "/customer/wallet" },
      { text: "باشگاه مشتریان", icon: <StarIcon />, path: "/customer/club" },
      { text: "تنظیمات", icon: <SettingsIcon />, path: "/customer/settings" },
    ],
    technician: [
      { text: "داشبورد", icon: <HomeIcon />, path: "/technician" },
      {
        text: "درخواست‌ها",
        icon: <AssignmentIcon />,
        path: "/technician/requests",
      },
      {
        text: "تقویم کاری",
        icon: <PeopleIcon />,
        path: "/technician/customers",
      },
      { text: "گزارش گیری", icon: <WalletIcon />, path: "/technician/wallet" },
      { text: "پیام ها", icon: <WalletIcon />, path: "/technician/wallet" },
      { text: "پروفایل", icon: <WalletIcon />, path: "/technician/wallet" },
      { text: "تنظیمات", icon: <SettingsIcon />, path: "/technician/settings" },
    ],
    agent: [
      { text: "داشبورد", icon: <HomeIcon />, path: "/agent" },
      {
        text: "تکنسین‌های تیم",
        icon: <AssignmentIcon />,
        path: "/agent/team-technicians",
      },
      {
        text: "مدیریت کارها",
        icon: <PeopleIcon />,
        path: "/agent/manage-tasks",
      },
      { text: "گزارش گیری تیم", icon: <WalletIcon />, path: "/agent/reports" },
      { text: "پیام ها", icon: <WalletIcon />, path: "/agent/messages" },
      { text: "پروفایل", icon: <WalletIcon />, path: "/agent/profile" },
      { text: "تنظیمات", icon: <SettingsIcon />, path: "/agent/setting" },
    ],
  };

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        bgcolor: "primary.main",
        color: "text.primary",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: "bold",
              cursor: "default",
            }}
          >
            هندى هوم
          </Typography>
          <Avatar
            src={user?.profile?.profile_picture || ""}
            alt={user?.profile?.first_name || ""}
            sx={{ width: 64, height: 64, mt: 2, mx: "auto" }}
          />
          <Typography sx={{ mt: 1, cursor: "default" }}>{(`${user?.profile?.first_name} ${user?.profile?.last_name}`) || "بدون نام"}</Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.dark", cursor: "default" }}
          >
            {user?.profile?.user_type === "technician"
              ? "تکنسین"
              : user?.profile?.user_type === "customer"
              ? "مشتری"
              : user?.profile?.user_type === "agent"
              ? "نماینده"
              : "کاربر مهمان"}
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "secondary.dark", opacity: ".5" }} />

        {/* Navigation Menu */}
        <List>
          {menuItems[user?.profile?.user_type].map((item, i) => (
            <ListItemButton
              key={i}
              component={NavLink}
              to={item.path}
              end={item.path}
              onClick={onClose}
              sx={{
                color: "text.primary",
                transition: "all 0.2s ease",
                borderRadius: 4,
                mx: 1,
                "&.active": {
                  bgcolor: "secondary.main",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
            >
              <ListItemIcon sx={{ color: "secondary.main" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ bgcolor: "secondary.dark", opacity: ".5", mb: 1 }} />
        <Button
          onClick={handleLogout}
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          sx={{
            borderColor: "rgba(255,255,255,0.4)",
            color: "primary",
            "&:hover": {
              borderColor: "secondary.main",
              bgcolor: "secondary.dark",
            },
            gap: 1,
          }}
        >
          خروج
        </Button>
      </Box>
    </Box>
  );
}
