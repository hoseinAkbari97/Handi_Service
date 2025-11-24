import React, { useContext } from "react";
import SummaryCard from "../Components/SummaryCard";
import Requests from "../Components/Requests";
import { Box } from "@mui/material";
import { UserContext } from "../../../Contexts/UserContext";
import { toPersianNumber } from "../../../Utils/NumberUtils";

export default function TechnicianDashboardPanel() {

    const {user} = useContext(UserContext)

  return (
    <>
      <Box
        sx={{
          flexGrow: "1",
          display: { lg: "grid" },
          gridTemplateColumns: { lg: "1fr 1fr" },
          gridTemplateRows: { lg: "auto" },
          gap: 1,
          gridTemplateAreas: {
            lg: `"summary req"`,
          },
        }}
      >
        {/* Summary Section */}
        <Box
          mt={{ xs: 3, lg: 0 }}
          display="grid"
          gap={1}
          gridTemplateColumns={{
            xs: "1fr",
            md: "1fr 1fr",
            lg: "1fr",
          }}
          sx={{ gridArea: "summary" }}
        >
          <SummaryCard
            iconType="workDone"
            label="کارهای انجام شده"
            value={toPersianNumber(user.completed_jobs)}
          />
          <SummaryCard
            iconType="Income"
            label="درآمد این ماه"
            value={`${toPersianNumber(user.monthly_income)} تومان`}
          />
          <SummaryCard
            iconType="rate"
            label="میانگین امتیاز"
            value={`${toPersianNumber(user.average_rating)}`}
          />
          <SummaryCard
            iconType="clock"
            label="میانگین زمان پاسخگویی"
            value={`${toPersianNumber(user.average_response_time)} دقیقه`}
          />
        </Box>

        {/* Income Chart */}

        {/* New Requests */}
        <Box
          sx={{
            gridArea: "req",
            mt: { xs: 2, lg: 0 },
          }}
        >
          <Requests requests={user.recent_requests} />
        </Box>
      </Box>
    </>
  );
}
