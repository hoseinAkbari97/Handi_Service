import React, { useContext, useEffect, useState } from "react";
import TechnicianCard from "../Components/TechnicianCard";
import { Box } from "@mui/material";
import { UserContext } from "../../../Contexts/UserContext";

export default function TeamTechnicians() {
  const { user } = useContext(UserContext);
  const [ technicianTeam, setTechnicianTeam ] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/service/dashboard/representative/team/", {
      headers: { Authorization: `Bearer ${user.access}` },
    })
      .then((Response) => Response.json())
      .then((data) => setTechnicianTeam(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 1,
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      }}
    >
      
      {technicianTeam.map((technician, index) => (
        <Box key={index}>
          <TechnicianCard technician={technician} />
        </Box>
      ))}
    </Box>
  );
}
