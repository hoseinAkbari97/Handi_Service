import { Box, Typography, Button } from "@mui/material";
import { Engineering } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import PackageModal from "./PackageModal";
import { useState } from "react";
import InformationModal from "./InformationModal";

export default function TaskCard({ tasks, refreshTasks }) {
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const handleOpenPackageModal = (task) => {
    setSelectedTask(task);
    setOpenPackageModal(true);
  };
  const handleClosePackageModal = () => {
    setSelectedTask(null);
    setOpenPackageModal(false);
  };

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleOpenInfoModal = (task) => {
    setSelectedTask(task)
    setOpenInfoModal(true)
  }
  const handleCloseInfoModal = () => {
    setSelectedTask(null)
    setOpenInfoModal(false)
  }

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
              borderRadius: 3,
              mt: 2,
              pb: 2,
            }}
          >
            <Box>
              <Button
                onClick={()=> handleOpenInfoModal(task)}
                sx={{
                  minWidth: "100% !important",
                  height: "2rem",
                  color: "text.primary",
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
                  onClick={() => handleOpenPackageModal(task)}
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.2,
                    width: "70%",
                    display: "flex",
                    justifySelf: "center",
                  }}
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
        openModal={openPackageModal}
        closeModal={handleClosePackageModal}
        taskData={selectedTask}
        refreshTasks={refreshTasks}
      />

      <InformationModal
        openModal={openInfoModal}
        closeModal={handleCloseInfoModal}
        task={selectedTask}
      />
    </>
  );
}
