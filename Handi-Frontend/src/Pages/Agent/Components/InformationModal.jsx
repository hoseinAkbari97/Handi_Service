import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Typography } from "@mui/material";

export default function InformationModal({
  openModal,
  closeModal,
  task,
}) {

  return (
    <>
      <Modal open={openModal} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.default",
            width: "70%",
            maxWidth: "60rem",
            borderRadius: 3,
            p: 2,
          }}
        >
          <Typography
            variant="h5"
            color="text.contrastText"
            fontWeight={"bold"}
            mb={1}
          >
            اطلاعات کامل درخواست
          </Typography>

          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "secondary.main",
              borderRadius: ".5rem",
              gap:1,
              color:"text.contrastText",
              p:2
            }}
          >
            <Typography>{task?.title}</Typography>
            <Typography>نام مشتری: {task?.customer_name}</Typography>
            <Typography>شماره تلفن مشتری: {task?.customer_phone}</Typography>
            <Typography>تاریخ ثبت درخواست: {task?.created_at}</Typography>
            <Typography>مبلغ اولیه: {task?.cost} تومان</Typography>
            <Typography>
              ایراد ثبت شده توسط مشتری: {task?.description}
            </Typography>
            <Typography>
              وضعیت فعلی درخواست:{" "}
              {task?.status === "pending"
                ? "درحال بررسی"
                : task?.status === "assigned"
                  ? "اختصاص داده شده"
                  : task?.status === "in_progress"
                    ? "درحال انجام"
                    : task?.status === "completed"
                      ? "تکمیل شده"
                      : task?.status === "approved"
                        ? "درحال بررسی توسط تعمیرکار"
                        : "رد شده"}
            </Typography>
            <Typography>تعمیرکار: {task?.technician_name ? task.technician_name : "تخصیص داده نشده"}</Typography>
            <Typography>تلفن تعمیرکار: {task?.technician_name ? task.technician_phone : "تخصیص داده نشده"}</Typography>
            <Typography>آخرین تغییر وضعیت: {task.updated_at}</Typography>

          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              backgroundColor: "primary.main",
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "text.secondary",
              },
            }}
            onClick={closeModal}
          >
            بستن
          </Button>
        </Box>
      </Modal>
    </>
  );
}
