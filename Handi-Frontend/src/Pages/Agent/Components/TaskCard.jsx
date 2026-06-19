import { Box, Typography, Button } from "@mui/material";
import { Engineering, Task } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";
import InformationModal from "./InformationModal";
import { useState } from "react";

export default function TaskCard({ task }) {
  const [openModal, setOpenModal] = useState(true);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
        borderRadius: 3,
        mt: 2,
        pb: 2,
      }}
    >
      <Box>
        <Button
        onClick={handleOpenModal}
          sx={{
            minWidth: "100% !important",
            height: "2rem",
            color: "primary.dark",
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
            "&:hover": {
              bgcolor:
                task.status === "pending"
                  ? "secondary.light"
                  : task.status === "assigned"
                    ? "success.light"
                    : task.status === "in_progress"
                      ? "warning.main"
                      : task.status === "completed"
                        ? "success.main"
                        : task.status === "approved"
                          ? "secondary.main"
                          : "error.light",
            },
            p: "0",
            m: "0",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          اطلاعات بیشتر
        </Button>

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
      </Box>

      <InformationModal
        openModal={openModal}
        closeModal={handleCloseModal}
        task={task}
      />
    </Box>
  );
}
