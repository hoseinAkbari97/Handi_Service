import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function PackageCard({ title, comment, technicians, bgColor, txtColor }) {
  const [technician, setTechnician] = useState("");

  const handleChange = (event) => {
    setTechnician(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: bgColor,
        width: "100%",
        height: "33%",
        borderRadius: 3,
        justifyContent: "space-around",
        alignItems: "center",
        px: 4,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: txtColor,
            fontWeight: "bold",
            cursor: "default",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mt: 1,
            color: txtColor,
            cursor: "default",
          }}
        >
          {comment}
        </Typography>
      </Box>

      <Box width="50%">
        <FormControl fullWidth>
          <InputLabel>تخصیص به تکنسین</InputLabel>
          <Select
            value={technician}
            label="تخصیص به تکنسین"
            onChange={handleChange}
          >
            {technicians.map((technician) => (
              <MenuItem key={technician.id} value={technician.first_name}>
                {technician.first_name} {technician.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
