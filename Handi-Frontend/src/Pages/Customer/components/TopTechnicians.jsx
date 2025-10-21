import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";

export default function TopTechnicians({ avatar, fullName, expertise, rate }) {
  return (
    <Paper
      sx={{
        backgroundColor: "primary.main",
        color: "text.primary",
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ alignSelf: "flex-start" }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          تعمیرکاران برتر
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side (avatar + fullName + expertise) */}
        <Box mt={4} sx={{ display: "flex" }}>
          <Avatar alt={fullName} src={avatar} sx={{ width: 45, height: 45 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 2,
              alignItems: "flex-start",
            }}
          >
            <Typography>{fullName}عرفان نشاطی</Typography>
            <Typography>تخصص:{expertise}</Typography>
          </Box>
        </Box>

        {/* Right Side (icon + rate) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography mt={1} mr={1} color="text.secondary">
            {rate}4.9
          </Typography>
          <StarIcon sx={{ fontSize: 30, color: "secondary.main" }}></StarIcon>
        </Box>
      </Box>
      <Divider
        variant="middle"
        sx={{ mt: 2, width: "70%", mx: "auto", borderColor: "secondary.dark" }}
      />
    </Paper>
  );
}
