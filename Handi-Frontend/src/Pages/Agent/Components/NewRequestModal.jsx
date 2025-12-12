import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";

export default function NewRequestModal({ openModal, closeModal }) {
  const { user } = useContext(UserContext);
  const [technician, setTechnician] = useState("");

  const handleChange = (event) => {
    setTechnician(event.target.value);
  };

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
          <Box
            sx={{
              display: "flex",
              backgroundColor: "primary.main",
              width: "100%",
              height: "33%",
              borderRadius: 3,
              justifyContent: "space-around",
              alignItems: "center",
              px: 4,
            }}
          >
            <Typography
              sx={{
                color: "secondary.main",
                fontWeight: "bold",
                width: "50%",
              }}
            >
              پکیج عادی
            </Typography>
            <Box width="50%">
              <FormControl fullWidth>
                <InputLabel>تخصیص به تکنسین</InputLabel>
                <Select
                  value={technician}
                  label="تخصیص به تکنسین"
                  onChange={handleChange}
                >
                  {user.technicians.map((technician) => (
                    <MenuItem key={technician.id} value={technician.first_name}>
                      {technician.first_name} {technician.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

        </Box>
      </Modal>
    </>
  );
}
