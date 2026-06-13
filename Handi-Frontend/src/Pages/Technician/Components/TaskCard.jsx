import { Box, Typography, Button } from "@mui/material";
import { Engineering } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";
import { API_CONFIG } from "../../../config/api";
import { UserContext } from "../../../Contexts/UserContext";
import { useContext } from "react";

export default function TaskCard({ task, refreshTasks }) {
  const { user } = useContext(UserContext);

  const completeWorkHandler = () => {
    console.log("completed");
    
    fetch(API_CONFIG.endpoints.technicianDashboard.newRequestCard(task.id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        status: "completed",
      }),
    }).then((response) => {
      console.log(response);
      refreshTasks();
    });
  };

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
        borderColor:
          task.status === "pending"
            ? "secondary.main"
            : task.status === "assigned"
              ? "success.dark"
              : task.status === "in_progress"
                ? "warning.light"
                : task.status === "completed"
                  ? "success.light"
                  : task.status === "approved"
                    ? "secondary.main"
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
          {task.title}
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
            نام مشتری: {task.customer_name}
          </Typography>
        </Box>

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
              textAlign: "center",
              fontSize: 14,
              mt: 0.5,
            }}
          >
            مشکل: {task.description}
          </Typography>
        </Box>

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
            تکنسین: {task.technician_name}
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
              task.status === "pending"
                ? "secondary.main"
                : task.status === "assigned"
                  ? "success.dark"
                  : task.status === "in_progress"
                    ? "warning.light"
                    : task.status === "completed"
                      ? "success.light"
                      : task.status === "approved"
                        ? "secondary.main"
                        : "error.main",
            borderRadius: 10,
            mx: "auto",
          }}
        >
          <Typography>
            {task.status === "pending"
              ? "درحال بررسی"
              : task.status === "assigned"
                ? "اختصاص داده شده"
                : task.status === "in_progress"
                  ? "درحال انجام"
                  : task.status === "completed"
                    ? "تکمیل شده"
                    : task.status === "approved"
                      ? "درحال بررسی توسط تعمیرکار"
                      : "رد شده"}
          </Typography>
        </Box>

        {task.status === "in_progress" && (
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
              onClick={completeWorkHandler}
              size="large"
              variant="contained"
              sx={{
                minWidth: "50%",
                textWrap: "nowrap",
                color: "text.contrastText",
                backgroundColor: "secondary.main",
                mt: 1,
                padding: "8px 22px",
                justifySelf: "center",
                "&:hover": {
                  backgroundColor: "secondary.light",
                },
              }}
            >
              پایان کار
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
