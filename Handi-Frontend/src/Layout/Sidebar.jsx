import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
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
  Menu as MenuIcon,
  People as PeopleIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar({ role, user, onClose }) {

  const menuItems = {
    customer: [
      { text: "داشبورد", icon: <HomeIcon />, path: "/customer/dashboard" },
      { text: "درخواست‌های من", icon: <AssignmentIcon />, path: "/customer/requests" },
      { text: "تعمیرکاران", icon: <BuildIcon />, path: "/customer/technicians" },
      { text: "کیف پول", icon: <WalletIcon />, path: "/customer/wallet" },
      { text: "باشگاه مشتریان", icon: <StarIcon />, path: "/customer/club" },
      { text: "تنظیمات", icon: <SettingsIcon />, path: "/customer/settings" },
    ],
    technician: [
      { text: "داشبورد", icon: <HomeIcon />, path: "/technician/dashboard" },
      { text: "درخواست‌ها", icon: <AssignmentIcon />, path: "/technician/requests" },
      { text: "مشتریان من", icon: <PeopleIcon />, path: "/technician/customers" },
      { text: "کیف پول", icon: <WalletIcon />, path: "/technician/wallet" },
      { text: "تنظیمات", icon: <SettingsIcon />, path: "/technician/settings" },
    ],
  };

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "#00332d",
        color: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#ffb300", fontWeight: "bold" }}>
            هندى هوم
          </Typography>
          <Avatar
            src={user?.avatar || ""}
            alt={user?.name || ""}
            sx={{ width: 64, height: 64, mt: 2, mx: "auto" }}
          />
          <Typography sx={{ mt: 1 }}>{user?.name || "کاربر مهمان"}</Typography>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
          {role === "technician" ? "تکنسین" : (role === "customer" ? "مشتری" : "کاربر مهمان")}
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

        <List>
          {menuItems[role].map((item, i) => (
            <ListItemButton
              key={i}
              component={Link}
              to={item.path}
              onClick={onClose}
              sx={{
                color: "#fff",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ffb300" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 1 }} />
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          sx={{
            borderColor: "rgba(255,255,255,0.4)",
            color: "#fff",
            "&:hover": { borderColor: "#ffb300", color: "#ffb300" },
          }}
        >
          خروج
        </Button>
      </Box>
    </Box>
  );
}
