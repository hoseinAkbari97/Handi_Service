import { Box, Paper, Typography, Avatar, Divider } from "@mui/material";
import React from "react";

export default function Works({ requests }) {
  return (
    <Paper
      sx={{
        backgroundColor: "primary.main",
        color: "text.primary",
        p: 3,
        mt: { xl: "0" },
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ alignSelf: "flex-start", mb: 2 }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          کارهای اخیر تیم
        </Typography>
      </Box>

      {requests && requests.length > 0 ? (
        requests.map((request, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              {/* Left Side (avatar + fullName + expertise) */}
              <Box sx={{ display: "flex" }}>
                <Avatar
                  alt={request.customerName}
                  src={request.customer_profile_picture}
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
                  <Typography>{request.customer_name}</Typography>
                  <Typography variant="caption" mt={0.5} color="text.dark">
                    {request.title} {request.device} {request.brand}
                  </Typography>
                  <Typography variant="caption" mt={0.5} color="text.dark">
                    وضعیت:
                  </Typography>
                  <Typography variant="caption" mt={0.5} color="text.dark">
                    تکنسین‌:
                  </Typography>
                </Box>
              </Box>

              {/* Right Side (icon + rate) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography color="text.secondary" mt={1}>
                  {request.time_ago} پیش
                </Typography>
              </Box>
            </Box>

            {index < requests.length - 1 && (
              <Divider
                sx={{
                  mt: 2,
                  width: "80%",
                  mx: "auto",
                  opacity: ".5",
                  borderColor: "secondary.dark",
                }}
              />
            )}
          </React.Fragment>
        ))
      ) : (
        <Typography
          variant="body2"
          color="text.dark"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          هیچ درخواست فعالی وجود ندارد
        </Typography>
      )}
    </Paper>
  );
}
