import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Engineering, Star } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import ButtonGroup from "@mui/material/ButtonGroup";
import PersonIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";
import { blue } from "@mui/material/colors";

export default function TaskCard({ task }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifySelf: "center",
        flexDirection: "column",
        backgroundColor: "primary.main",
        justifyContent: "space-between",
        width: 280,
        height: 380,
        borderTop: 5,
        borderColor: task.status === "complete"
        ? "success.light"
        : task.status === "current"
        ? "warning.light"
        : "error.main",
        borderRadius: 3,
        mt: 2,
        pb: 2,
        px: 2,
      }}
    >
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
          {task.request.request} {task.request.device} {task.request.brand}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            gap: 0.3,
          }}
        >
          <PersonIcon fontSize="small" />
          <Typography
            sx={{
              fontSize: 14,
              mt: 0.5,
            }}
          >
            نام مشتری: {task.customerName}
          </Typography>
        </Box>

        {task.request.requestType && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
              mt: 2,
            }}
          >
            <ErrorIcon fontSize="small" />
            <Typography
              sx={{
                fontSize: 14,
                mt: 0.5,
              }}
            >
              مشکل: {task.request.requestType}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 0.5,
          }}
        >
          <Engineering fontSize="small" />
          <Typography
            sx={{
              fontSize: 14,
              mt: 0.5,
            }}
          >
            تکنسین: {task.technicianName}
          </Typography>
        </Box>
      </Box>

      <Box>
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
              task.status === "complete"
                ? "success.light"
                : task.status === "current"
                ? "warning.light"
                : "error.main",
            borderRadius: 10,
            mx: "auto",
          }}
        >
          <Typography>
            {task.status === "complete"
              ? "تکمیل شده"
              : task.status === "current"
              ? "درحال انجام"
              : "تخصیص داده نشده"}
          </Typography>
        </Box>

        {task.status === "suspended" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "",
              mt: 1,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                color: "text.contrastText",
                backgroundColor: "secondary.main",
                "&:hover": {
                  backgroundColor: "secondary.light",
                },
              }}
            >
              تخصیص به تکنسین
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
