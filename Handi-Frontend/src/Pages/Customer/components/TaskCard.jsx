import { Box, Typography, Button } from "@mui/material";
import { Engineering, Phone } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ErrorIcon from "@mui/icons-material/Error";
import { toPersianNumber } from "../../../Utils/NumberUtils";

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
        borderColor:
          task.status === "pending"
            ? "secondary.main"
            : task.status === "assigned"
            ? "success.main"
            : task.status === "in_progress"
            ? "warning.light"
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

        {task.technician && (
          <Box>
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
                تکنسین: {task?.technician?.first_name}{" "}
                {task?.technician?.last_name}
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
              <Phone fontSize="small" />
              <Typography
                sx={{
                  fontSize: 14,
                  mt: 0.5,
                }}
              >
                شماره تکنسین: {task?.technician?.phone}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                gap: 0.3,
              }}
            >
              <AttachMoneyIcon fontSize="small" />
              <Typography
                sx={{
                  fontSize: 14,
                  mt: 0.5,
                }}
              >
                هزینه درخواست: {toPersianNumber(task.cost)} تومان
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box>
        {!task.technician && (
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              mt: 2,
              textAlign: "center",
              color: "warning.light",
            }}
          >
            در انتظار تخصیص به تعمیرکار
          </Typography>
        )}
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
                : task.status === "in_progress"
                ? "warning.light"
                : task.status === "completed"
                ? "success.light"
                : "error.main",
            borderRadius: 10,
            mx: "auto",
          }}
        >
          <Typography>
            {task.status === "completed"
              ? "تکمیل شده"
              : task.status === "pending"
              ? "در انتظار تأیید"
              : task.status === "assigned"
              ? "تخصیص داده شد"
              : task.status === "in_progress"
              ? "درحال انجام"
              : "تخصیص داده نشده"}
          </Typography>
        </Box>

        {task.status === "assigned" && (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
          >
            مشاهده پکیج ها
          </Button>
        )}
      </Box>
    </Box>
  );
}
