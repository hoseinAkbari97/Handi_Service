import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useContext } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import PackageCard from "./PackageCard";

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
            gap:1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "secondary.main",
            width: "70%",
            height: "70%",
            borderRadius: 3,
            p: 2,
          }}
        >

          <PackageCard title={"پکیج عادی"} technicians={user.technicians} />
          <PackageCard title={"پکیج نقره‌ای"} technicians={user.technicians} />
          <PackageCard title={"پکیج طلایی"} technicians={user.technicians} />
        </Box>
      </Modal>
    </>
  );
}
