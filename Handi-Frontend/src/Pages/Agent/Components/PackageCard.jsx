import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function PackageCard({
  title,
  comment,
  technicians,
  bgColor,
  txtColor,
  value,
  onChange,
}) {

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
        p: 4,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: txtColor,
            fontWeight: "bold",
            cursor: "default",
            fontSize:{
              lg:"20px",
              sm:"1rem",
              xs: "12px"
            }
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
            fontSize:{
              lg:"15px",
              sm:"14px",
              xs: "10px"
            }
          }}
        >
          {comment}
        </Typography>
      </Box>

      <Box width="30%">
        <FormControl fullWidth>
          <InputLabel>تخصیص به تکنسین</InputLabel>
          <Select
            value={value ?? ""}
            label="تخصیص به تکنسین"
            onChange={onChange}
          >
            {technicians.map((tech) => (
              <MenuItem key={tech.id} value={tech.id}>
                {tech.first_name} {tech.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
