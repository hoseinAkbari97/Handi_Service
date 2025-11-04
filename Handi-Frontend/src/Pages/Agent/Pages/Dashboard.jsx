import React from 'react'
import SummaryCard from "../Components/SummaryCard";
import Works from "../Components/Works";
import { RequestsList } from "../../../Datas";
import { Box } from "@mui/material";

export default function Dashboard() {
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
              iconType="group"
              label="تکنسین‌های تیم"
              value="۸ نفر"
            />
            <SummaryCard
              iconType="checkList"
              label="کارهای فعال امروز"
              value="۱۲"
            />
            <SummaryCard iconType="money" label="درآمد این ماه تیم" value="۱۲۰ میلیون تومان" />
            <SummaryCard
              iconType="rate"
              label="میانگین امتیاز تیم"
              value="۴.۸"
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
            <Works requests={RequestsList} />
          </Box>
        </Box>
    </>
  )
}
