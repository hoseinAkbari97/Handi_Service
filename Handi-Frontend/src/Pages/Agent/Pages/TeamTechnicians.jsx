import React from "react";
import TechnicianCard from "../Components/TechnicianCard";
import { Box } from "@mui/material";
import { TechniciansList } from "../../../Datas";

export default function TeamTechnicians() {
  return (
    <Box
    sx={{
      display:"flex" ,
      justifyContent:"center",
      alignItems:"center",
      height:"100%",
      gap:2
    }}
      
    >
      {TechniciansList.map((technician, index) => (
        <Box key={index}>
          <TechnicianCard technician={technician} />
        </Box>
      ))}
    </Box>
  );
}
