import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";

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

      {/* Left Side (avatar + fullName + expertise) */}
      <Box mt={4} sx={{ display: "flex" }}>
        <Avatar alt={fullName} src={avatar} sx={{ width: 45, height: 45 }} />
        <Box>
          <Typography>
            
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
