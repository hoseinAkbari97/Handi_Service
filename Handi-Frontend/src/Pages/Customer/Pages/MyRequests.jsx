import React, { useContext, useEffect, useState } from "react";
import TaskCard from "../Components/TaskCard";
import { Box } from "@mui/material";
import { UserContext } from "../../../Contexts/UserContext";

export default function ManageTasks() {
  const { user } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 1,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      }}
    >
        <Box>
          <TaskCard task={user.active_request} />
        </Box>
    </Box>
  );
}
