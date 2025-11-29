import React, { useContext } from "react";
import { Box } from "@mui/material";
import ActiveRequestCard from "../Components/ActiveRequestCard";
import SummaryCard from "../Components/SummaryCard";
import TopTechnicians from "../Components/TopTechnicians";
import { UserContext } from "../../../Contexts/UserContext";
import { toPersianNumber } from "../../../Utils/NumberUtils";

export default function CustomerDashboardPanel() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Box
        sx={{
          flexGrow: "1",
          display: { lg: "grid" },
          gridTemplateColumns: { lg: "1.5fr 1fr", xl: "1fr 1fr 1fr" },
          gridTemplateRows: { lg: "auto auto", xl: "auto" },
          gap: 1,
          gridTemplateAreas: {
            lg: `"active summary"
                   "topTech summary"`,
            xl: `"active topTech summary"`,
          },
        }}
      >
        {/* Active Request */}
        <Box sx={{ gridArea: { lg: "active", xl: "active" } }}>
          <ActiveRequestCard />
        </Box>

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
          sx={{ gridArea: { lg: "summary", xl: "summary" } }}
        >
          <SummaryCard
            iconType="requests"
            label="کل درخواست‌ها"
            value={user.total_requests}
          />
          <SummaryCard
            iconType="done"
            label="خدمات انجام‌شده"
            value={user.completed_requests}
          />
          <SummaryCard
            iconType="wallet"
            label="موجودی کیف پول"
            value={`${toPersianNumber(user.wallet_balance)} تومان`}
          />
        </Box>

        {/* Top Technicians */}
        <Box
          sx={{
            gridArea: { lg: "topTech", xl: "topTech" },
            mt: { xs: 2, lg: 0 },
          }}
        >
          <TopTechnicians technicians={user.top_technicians} />
        </Box>
      </Box>
    </>
  );
}
