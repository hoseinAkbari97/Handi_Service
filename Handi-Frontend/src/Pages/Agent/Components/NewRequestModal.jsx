import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function NewRequestModal({ task, openModal, closeModal }) {
  return (
    <div>
      <Modal open={openModal} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "secondary.main",
            // width: 280,
            // height: 380,
            borderRadius: 3,
            p: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "primary.main",
              width: "100%",
              height: "5rem",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Typography
              sx={{
                color: "secondary.main",
                fontWeight: "bold",
              }}
            >
              پکیج عادی
            </Typography>
          </Box>
          <Typography color="black">Text in a modal</Typography>
          <Typography color="black">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
