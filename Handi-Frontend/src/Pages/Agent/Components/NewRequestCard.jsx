import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";
import NewRequestModal from "./NewRequestModal";
import InformationModal from "./InformationModal";
import { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";

export default function NewRequestCard({ task, refreshTasks }) {
  const { user } = useContext(UserContext);
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const handleOpenPackageModal = () => setOpenPackageModal(true);
  const handleClosePackageModal = () => setOpenPackageModal(false);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleOpenInfoModal = () => setOpenInfoModal(true);
  const handleCloseInfoModal = () => setOpenInfoModal(false);

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
          borderRadius: 3,
          mt: 2,
          pb: 2,
        }}
      >
        <Box>
          <Button
            onClick={handleOpenInfoModal}
            sx={{
              minWidth: "100% !important",
              height: "2.1rem",
              color: "text.primary",
              backgroundColor: "success.main",
              "&:hover": {
                bgcolor: "primary.main",
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
              نام مشتری: {task.customer_name}
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
              تلفن مشتری: {task.customer_phone}
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
              موضوع درخواست: {task.title}
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
          <Button
            onClick={handleOpenPackageModal}
            size="large"
            variant="contained"
            color="primary.dark"
            sx={{
              minWidth: "50%",
              textWrap: "nowrap",
              backgroundColor: "success.main",
              mt: 1,
              justifySelf: "center",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            تخصیص پکیج ها
          </Button>
        </Box>
      </Box>

      <NewRequestModal
        openModal={openPackageModal}
        closeModal={handleClosePackageModal}
        task={task}
        refreshTasks={refreshTasks}
      />

      <InformationModal
        openModal={openInfoModal}
        closeModal={handleCloseInfoModal}
        task={task}
      />
    </>
  );
}
