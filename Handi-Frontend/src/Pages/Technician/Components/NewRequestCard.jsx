import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";
import { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { API_CONFIG } from "../../../config/api";

export default function NewRequestCard({ task, refreshTasks }) {
  const { user } = useContext(UserContext);

  const cancleRequestHandler = () => {
    fetch(API_CONFIG.endpoints.technicianDashboard.newRequestCard(task.id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        action: "reject",
      }),
    }).then((response) => {
      refreshTasks();
      console.log(response);
    });
  };

  const acceptRequestHandler = () => {
    fetch(API_CONFIG.endpoints.technicianDashboard.newRequestCard(task.id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        action: "accept",
      }),
    }).then((response) => {
      refreshTasks();
      console.log(response);
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifySelf: "center",
          flexDirection: "column",
          backgroundColor: "secondary.main",
          justifyContent: "space-between",
          width: 280,
          height: 380,
          borderTop: 5,
          borderColor: "primary.light",
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
              color: "primary.light",
            }}
          >
            درخواست جدید
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.contrastText",
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
              زمان مراجعه: {task.preferred_date}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.contrastText",
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
              آدرس مشتری: {task.full_address}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "text.contrastText",
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
              موضوع درخواست: {task.title} {task.brand}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "text.contrastText",
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
              مشکل: {task.description}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "",
            mt: 1,
            width: "100%",
          }}
        >
          <ButtonGroup
            size="large"
            variant="contained"
            aria-label="Basic button group"
            color="primary.main"
            sx={{ mt: 1, justifySelf: "center" }}
          >
            <Button
              onClick={acceptRequestHandler}
              sx={{
                minWidth: "50%",
                textWrap: "nowrap",
                backgroundColor: "success.main",
              }}
            >
              قبول درخواست
            </Button>
            <Button
              sx={{
                minWidth: "50%",
                textWrap: "nowrap",
                backgroundColor: "error.main",
              }}
              onClick={cancleRequestHandler}
            >
              رد درخواست
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
}
