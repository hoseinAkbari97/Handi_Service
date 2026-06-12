import { useContext, useEffect, useState } from "react";
import TaskCard from "../Components/TaskCard";
import NewRequestCard from "../Components/NewRequestCard";
import { Box } from "@mui/material";
import { UserContext } from "../../../Contexts/UserContext";
import { API_CONFIG } from "../../../config/api";

export default function ManageTasks() {
  const { user } = useContext(UserContext);
  const [allTasks, setAllTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        API_CONFIG.endpoints.agentDashboard.manageTasks,
        {
          headers: {
            Authorization: `Bearer ${user.access}`,
          },
        },
      );

      const data = await response.json();
      setAllTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const pendingTasks = allTasks.filter((task) => task.status === "pending");

  const checkedTasks = allTasks.filter((task) => task.status !== "pending");

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
      {pendingTasks.map((task) => (
        <NewRequestCard task={task} key={task.id} refreshTasks={fetchTasks} />
      ))}
      {checkedTasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </Box>
  );
}
