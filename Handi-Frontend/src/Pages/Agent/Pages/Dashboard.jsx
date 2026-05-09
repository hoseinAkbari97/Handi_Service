import { useContext } from "react";
import SummaryCard from "../Components/SummaryCard";
import Works from "../Components/Works";
import { Box } from "@mui/material";
import { toPersianNumber } from "../../../Utils/NumberUtils";
import { UserContext } from "../../../Contexts/UserContext";

export default function AgentDashboardPanel() {
  const { user } = useContext(UserContext);

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
        {/* {console.log(user)} */}
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
            iconType="group"
            label="تکنسین‌های تیم"
            value={`${toPersianNumber(user.team_size)}`}
          />
          <SummaryCard
            iconType="checkList"
            label="کارهای فعال امروز"
            value={`${toPersianNumber(user.active_jobs_today)}`}
          />
          <SummaryCard
            iconType="money"
            label="درآمد این ماه تیم"
            value={`${toPersianNumber(user.monthly_income)} تومان`}
          />
          <SummaryCard
            iconType="rate"
            label="میانگین امتیاز تیم"
            value={`${toPersianNumber(user.team_average_rating)}`}
          />
        </Box>

        {/* Income Chart */}

        {/* New Works */}
        <Box
          sx={{
            gridArea: "req",
            mt: { xs: 2, lg: 0 },
          }}
        >
          <Works requests={user.recent_team_requests} />
        </Box>
      </Box>
    </>
  );
}
