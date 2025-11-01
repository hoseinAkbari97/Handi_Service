import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { Star } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function TechnicianCard({ technician }) {
  return (
    <Box
      sx={{
        display:"flex",
        justifySelf:"center",
        flexDirection:"column",
        backgroundColor: "primary.main",
        width: 220,
        height: 350,
        borderRadius: 3,
        mt:5
      }}
    >
      <Avatar
        src={technician?.avatar || ""}
        alt={technician?.name || ""}
        sx={{ width: 74, height: 75, mt: -4, mx: "auto" }}
      />

      <Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            mt: 2,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          {technician.fullName}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            mt: 2,
            textAlign: "center",
          }}
        >
          تخصص: {technician.expertise}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Star color="secondary" />
          <Typography
            sx={{
              fontSize: 16,
              mt: 2,
              textAlign: "center",
              color: "text.secondary",
              mb: 1,
            }}
          >
            {technician.rate}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <PhoneIcon />
          <Typography
            sx={{
              fontSize: 16,
              mt: 2,
              textAlign: "center",

              mb: 1,
            }}
          >
            {technician.phone}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "fit-content",
            px: 3,
            mt: 1,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              technician.status === "available"
                ? "success.light"
                : technician.status === "busy"
                ? "warning.light"
                : "error.main",
            borderRadius: 10,
            mx: "auto",
          }}
        >
          <Typography>
            {technician.status === "available"
              ? "آماده به کار"
              : technician.status === "busy"
              ? "درحال انجام کار"
              : "آفلاین"}
          </Typography>
        </Box>

        <Box sx={{display:"flex", justifyContent:"center", alignSelf:"", mt:1, width:"100%"}}>
          <ButtonGroup
            size="large"
            variant="contained"
            aria-label="Basic button group"
            color="secondary"
            sx={{ mt: 1, justifySelf: "center" }}
          >
            <Button>جزئیات</Button>
            <Button>ویرایش</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
