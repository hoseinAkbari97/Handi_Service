import { Box, Typography, Button } from "@mui/material";
import { Engineering } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import PackageModal from "./PackageModal";
import { useState } from "react";

export default function TaskCard({ tasks, refreshTasks }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setSelectedTask(null);
    setOpenModal(false);
  };

  return (
    <>
      {tasks ? (
        tasks.map((task) => (
          <Box
            key={task.id}
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
                    ? "success.main"
                    : task.status === "approved"
                      ? "secondary.dark"
                      : task.status === "in_progress"
                        ? "warning.light"
                        : task.status === "cancelled"
                          ? "error.main"
                          : task.status === "completed"
                            ? "success.light"
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                  <ErrorIcon fontSize="small" />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: 14,
                      mt: 0.8,
                    }}
                  >
                    مشکل: {task.description}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Engineering fontSize="small" />
                  <Typography
                    sx={{
                      fontSize: 14,
                      mt: 0.8,
                    }}
                  >
                    برند دستگاه: {task?.brand}{" "}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Engineering fontSize="small" />
                  <Typography
                    sx={{
                      fontSize: 14,
                      mt: 0.8,
                    }}
                  >
                    آدرس: {task?.full_address}{" "}
                  </Typography>
                </Box>

                {/* {console.log(task)} */}

                {task.status === "pending" ? (
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: "bold",
                      mt: 2,
                      textAlign: "center",
                      color: "warning.light",
                    }}
                  >
                    در انتظار تایید نماینده...
                  </Typography>
                ) : (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 0.8,
                      }}
                    >
                      <Engineering fontSize="small" />
                      <Typography
                        sx={{
                          fontSize: 14,
                          mt: 0.5,
                        }}
                      >
                        تکنسین: {task?.technician_name}
                      </Typography>
                    </Box>
                  </Box>
                )}
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
                        ? "success.main"
                        : task.status === "approved"
                          ? "secondary.dark"
                          : task.status === "in_progress"
                            ? "warning.light"
                            : task.status === "cancelled"
                              ? "error.main"
                              : task.status === "completed"
                                ? "success.light"
                                : "error.main",
                  borderRadius: 10,
                  mx: "auto",
                }}
              >
                <Typography>
                  {task.status === "pending"
                    ? "در انتظار تأیید"
                    : task.status === "assigned"
                      ? "تخصیص داده شد"
                      : task.status === "approved"
                        ? "در انتظار تأیید تعمیرکار"
                        : task.status === "in_progress"
                          ? "درحال انجام"
                          : task.status === "cancelled"
                            ? "رد شده"
                            : task.status === "completed"
                              ? "تکمیل شده"
                              : "تخصیص داده نشده"}
                </Typography>
              </Box>

              {task.status === "assigned" && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal(task)}
                  fullWidth
                  sx={{ mt: 2, py: 1.2 }}
                >
                  مشاهده پکیج ها
                </Button>
              )}
            </Box>
          </Box>
        ))
      ) : (
        <Typography textAlign={"center"} variant="h6" color="text.contrastText">
          هیچ درخواست فعالی وجود ندارد
        </Typography>
      )}

      <PackageModal
        openModal={openModal}
        closeModal={handleCloseModal}
        taskData={selectedTask}
        refreshTasks={refreshTasks}
      />
    </>
  );
}
