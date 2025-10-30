import React from "react";
import TechnicianCard from "../Components/TechnicianCard";
import { Box } from "@mui/material";
import {TechniciansList} from "../../../Datas"

export default function TeamTechnicians() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
    >
      <TechnicianCard technician={TechniciansList[0]}/>
      {console.log(TechniciansList[0])}
      
    </Box>
  );
}
