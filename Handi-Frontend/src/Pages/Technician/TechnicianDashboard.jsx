import React, { useContext } from "react";
import { Box } from "@mui/material";
import Header from "./Components/Header";
import SummaryCard from "./Components/SummaryCard";
import Requests from "./Components/Requests";
// import { RequestsList } from "../../Datas";
// import { UsersList } from "../../Datas";
import Sidebar from "../../Layout/Sidebar";
import { UserContext } from "../../Contexts/UserContext";

export default function TechniciansDashboard() {

  const {user} = useContext(UserContext)

  if (!user) {
      return (
        <Box sx={{ p: 4, textAlign: "center" }}>
          در حال دریافت اطلاعات کاربری...
        </Box>
      );
    }

  return (
    <Box
    sx={{
      backgroundColor: "background.default",
      minHeight: "100vh",
      display: "flex",
      gap: 1,
    }}
    >
      
      {/* SideBar display: desktop & tablet */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <Sidebar role={user.profile.user_type} user={user} />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Heaedr */}
        <Header />

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
              value={user.completed_jobs}
            />
            <SummaryCard
              iconType="Income"
              label="درآمد این ماه"
              value={user.monthly_income}
            />
            <SummaryCard iconType="rate" label="میانگین امتیاز" value={user.average_rating} />
            <SummaryCard
              iconType="clock"
              label="میانگین زمان پاسخگویی"
              value={user.average_response_time}
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
      </Box>
    </Box>
  );
}
