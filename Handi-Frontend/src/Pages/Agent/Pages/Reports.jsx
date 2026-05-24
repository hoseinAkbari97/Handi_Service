import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../Theme/Theme";
import SummaryReport from "../Components/SummaryReport";
import Filter from "../Components/Filter";
import DetailsTable from "../Components/DetailsTable";
import { UserContext } from "../../../Contexts/UserContext";
import { API_CONFIG } from "../../../config/api";

export default function Reports() {
  const { user } = useContext(UserContext);
  const [reportData, setReportData] = useState({
    total_income: "...",
    total_tasks: "...",
    avg_rating: "...",
    efficiency: "...",
    task_details: [],
  });

  useEffect(() => {
    if (!user || !user.access) return;

    fetch(API_CONFIG.endpoints.agentDashboard.reports, {
      headers: { Authorization: `Bearer ${user.access}` },
    })
      .then((Response) => Response.json())
      .then((data) => setReportData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box sx={{ p: 3, direction: "rtl", backgroundColor: "background.default" }}>
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: theme.palette.primary.main,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        گزارش‌گیری تیم
      </Typography>

      {/* Filters Section */}
      <Filter technicians={user.technicians} />

      {/* Summary Reports */}
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          gap: 1,
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        <SummaryReport
          title="درآمد کل تیم"
          value={reportData.total_income}
          change="افزایش"
          changeRate={"۱۵٪"}
        />
        <SummaryReport
          title="تعداد کارها"
          value={reportData.total_tasks}
          change="کار بیشتر"
          changeRate={"۸"}
        />
        <SummaryReport
          title="میانگین امتیاز"
          value={reportData.avg_rating}
          change="افزایش"
          changeRate={"۰.۱"}
        />
        <SummaryReport
          title="کارآمدی تیم"
          value={reportData.efficiency}
          change="افزایش"
          changeRate={"۳٪"}
        />
      </Box>

      {/* Table Section */}
      <DetailsTable tasks={reportData.task_details} />
    </Box>
  );
}
