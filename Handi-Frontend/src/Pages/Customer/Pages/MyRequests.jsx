import { useContext, useEffect, useState } from "react";
import TaskCard from "../Components/TaskCard";
import { Box } from "@mui/material";
import { UserContext } from "../../../Contexts/UserContext";
import { API_CONFIG } from "../../../config/api";

export default function MyRequests() {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          API_CONFIG.endpoints.customerDashboard.getCustomerData,
          {
            headers: { Authorization: `Bearer ${user.access}` },
          },
        );
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };

    fetchData();
  }, []);

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
        <TaskCard tasks={requests} />
      </Box>
    </Box>
  );
}
