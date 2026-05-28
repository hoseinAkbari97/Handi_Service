import React, { useContext, useEffect, useState } from "react";
import TechnicianCard from "../Components/TechnicianCard";
import { Box } from "@mui/material";
import { UserContext } from "../../../Contexts/UserContext";
import { API_CONFIG } from "../../../config/api";

export default function TeamTechnicians() {
  const { user } = useContext(UserContext);
  const [technicianTeam, setTechnicianTeam] = useState([]);

  useEffect(() => {
    fetch(API_CONFIG.endpoints.agentDashboard.teamTechnician, {
      headers: { Authorization: `Bearer ${user.access}` },
    })
      .then((Response) => Response.json())
      .then((data) => setTechnicianTeam(data))
      .catch((error) => console.error("Error fetching data:", error));
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
