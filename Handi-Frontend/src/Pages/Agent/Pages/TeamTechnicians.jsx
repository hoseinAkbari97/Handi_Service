import React from "react";
import TechnicianCard from "../Components/TechnicianCard";
import { Box } from "@mui/material";
// import { TechniciansList } from "../../../Datas";

export default function TeamTechnicians() {
  return (
    <Box
    sx={{
      display:"grid" ,
      justifyContent:"center",
      alignItems:"center",
      height:"100%",
      gap:1,
      gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))"
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
