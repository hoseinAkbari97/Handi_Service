import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import PackageCard from "./PackageCard";
import { Button, Typography } from "@mui/material";
import { BorderClear } from "@mui/icons-material";

export default function NewRequestModal({ openModal, closeModal }) {
  const { user } = useContext(UserContext);

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
            backgroundColor: "secondary.main",
            width: "70%",
            maxWidth: "60rem",
            height: "70%",
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
            تخصیص به تکنسین ها
          </Typography>

          <PackageCard
            title={"پکیج عادی"}
            technicians={user.technicians}
            bgColor={"info.main"}
            txtColor={"text.primary"}
          />
          <PackageCard
            title={"پکیج نقره‌ای"}
            technicians={user.technicians}
            bgColor={"#C0C0C0"}
            txtColor={"#646464"}
          />
          <PackageCard
            title={"پکیج طلایی"}
            technicians={user.technicians}
            bgColor={"secondary.dark"}
            txtColor={"secondary.light"}
          />

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
          >
            ثبت اطلاعات
          </Button>
        </Box>
      </Modal>
    </>
  );
}
