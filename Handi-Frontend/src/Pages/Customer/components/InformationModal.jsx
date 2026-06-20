import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Typography } from "@mui/material";

export default function InformationModal({ openModal, closeModal, task }) {
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
              gap: 1,
              color: "text.contrastText",
              p: 3,
            }}
          >
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>{task?.title}</Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>نام مشتری: {task?.customer_name}</Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>شماره تلفن مشتری: {task?.customer_phone}</Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>تاریخ ثبت درخواست: {task?.created_at}</Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>مبلغ اولیه: {task?.cost} تومان</Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>
              ایراد ثبت شده توسط مشتری: {task?.description}
            </Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>
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
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>
              تعمیرکار:{" "}
              {task?.technician_name ? task.technician_name : "تخصیص داده نشده"}
            </Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>
              تلفن تعمیرکار:{" "}
              {task?.technician_name
                ? task.technician_phone
                : "تخصیص داده نشده"}
            </Typography>
            <Typography sx={{fontSize:{
              xs:"12px",
              sm:"14px",
              md:"1rem"
            }}}>آخرین تغییر وضعیت: {task?.updated_at}</Typography>
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
