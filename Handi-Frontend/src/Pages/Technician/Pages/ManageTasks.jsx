import { useContext, useEffect, useState } from "react";
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
    fetch("http://127.0.0.1:8000/api/service/dashboard/technician/requests/", {
      headers: { Authorization: `Bearer ${user.access}` },
    })
      .then((Response) => Response.json())
      .then((data) => setAllTasks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const pending = allTasks.filter((task) => task.status === "approved");
    const checked = allTasks.filter((task) => task.status !== "pending");

    setPendingTasks(pending);
    setCheckedTasks(checked);
  }, [allTasks]);

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
      {/* {console.log(pendingTasks)} */}
      {/* {console.log(checkedTasks)} */}
      {/* {console.log(allTasks)} */}
      
      {pendingTasks.map((task) => (
        <NewRequestCard task={task} key={task.id} />
      ))}
      {checkedTasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </Box>
  );
}
