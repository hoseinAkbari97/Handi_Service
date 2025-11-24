import { Box, Paper, Typography, Avatar, Divider } from "@mui/material";
import React, { useContext } from "react";
import StarIcon from "@mui/icons-material/Star";
import { UserContext } from "../../../Contexts/UserContext";

export default function TopTechnicians({ technicians }) {

  const {user} = useContext(UserContext)

  return (
    <Paper
      sx={{
        backgroundColor: "primary.main",
        color: "text.primary",
        p: 3,
        mt:{xl:"0"},
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ alignSelf: "flex-start", mb:2 }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          تعمیرکاران برتر
        </Typography>
      </Box>

      {user.top_technicians.map((technician, index) => (
        <React.Fragment key={technician.id}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
          >
            {/* Left Side (avatar + fullName + expertise) */}
            <Box sx={{ display: "flex", gap:1 }}>
              <Avatar
                alt={technician.name}
                src={technician.avatar}
                sx={{ width: 50, height: 50 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 2,
                  alignItems: "flex-start",
                }}
              >
                <Typography>{technician.first_name} {technician.last_name}</Typography>
                <Typography variant="caption" mt={0.5} color="text.dark">
                  تخصص: {technician.expertise}
                </Typography>
              </Box>
            </Box>

            {/* Right Side (icon + rate) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography color="text.secondary" mt={1}>
                {technician.rate}
              </Typography>
              <StarIcon sx={{ fontSize: 30, color: "secondary.main" }} />
            </Box>
          </Box>

          {index < user.top_technicians.length - 1 && (
            <Divider
              sx={{ mt: 2, width: "80%", mx:"auto",opacity:".5", borderColor: "secondary.dark" }}
            />
          )}
        </React.Fragment>
      ))}
    </Paper>
  );
}
