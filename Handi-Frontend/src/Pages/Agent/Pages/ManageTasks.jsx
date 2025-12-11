import React, { useContext, useEffect, useState } from "react";
import TaskCard from "../Components/TaskCard";
import NewRequestCard from "../Components/NewRequestCard";
import { Box } from "@mui/material";
import { UserContext } from "../../../Contexts/UserContext";

export default function ManageTasks() {
  const { user } = useContext(UserContext);
  const [allTasks, setAllTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/service/dashboard/representative/tasks/", {
      headers: { Authorization: `Bearer ${user.access}` },
    })
      .then((Response) => Response.json())
      .then((data) => setAllTasks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const pending = allTasks.filter((task)=> task.status === "pending")
    const checked = allTasks.filter((task)=> task.status !== "pending")

    setPendingTasks(pending);
    setCheckedTasks(checked)
  }, [allTasks])

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
      {pendingTasks.map(task => <NewRequestCard task={task}/> )}
      {checkedTasks.map(task => <TaskCard task={task}/> )}

    </Box>
  );
}
