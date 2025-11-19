import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import ActiveRequestCard from "./Components/ActiveRequestCard";
import SummaryCard from "./Components/SummaryCard";
import TopTechnicians from "./Components/TopTechnicians";
import Header from "./Components/Header";
import Sidebar from "../../Layout/Sidebar";
import { TechniciansList, UsersList } from "../../Datas";

export default function CustomerDashboard() {

  const [users, setUsers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await UsersList();
        const technisiansData = await TechniciansList();

        setUsers(usersData);
        setTechnicians(technisiansData);
      } catch (error) {
        console.error("Error Logs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Box sx={{ p: 4, textAlign: "center", color:"text.contrastText" }}>در حال بارگذاری...</Box>;
  }

  if (users.length === 0) {
    return <Box sx={{ p: 4, textAlign: "center" }}>هیچ کاربری یافت نشد.</Box>;
  }

  const currentUser = users[0];

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
        <Sidebar role={currentUser.role} user={currentUser} />
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
            <SummaryCard iconType="requests" label="کل درخواست‌ها" value="۲۴" />
            <SummaryCard iconType="done" label="خدمات انجام‌شده" value="۱۸" />
            <SummaryCard
              iconType="wallet"
              label="موجودی کیف پول"
              value="۵۵۰,۰۰۰ تومان"
            />
            <SummaryCard iconType="points" label="امتیاز کلاب" value="۱۲۰" />
          </Box>

          {/* Top Technicians */}
          <Box
            sx={{
              gridArea: { lg: "topTech", xl: "topTech" },
              mt: { xs: 2, lg: 0 },
            }}
          >
            <TopTechnicians technicians={technicians} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
