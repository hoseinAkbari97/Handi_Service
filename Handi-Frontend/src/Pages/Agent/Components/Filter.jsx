import React, {useState} from "react";
import {
  Box,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function Filter({technicians}) {

  const [period, setPeriod] = useState("ماه جاری");
  const [technician, setTechnician] = useState("همه تکنسین‌ها");

  return (
    <Card
      sx={{
        p: 2,
        backgroundColor: "primary.main",
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "secondary.main",
                "&.Mui-focused": {
                  color: "secondary.dark",
                },
              }}
            >
              دوره زمانی
            </InputLabel>

            <Select
              value={period}
              onChange={(event)=> setPeriod(event.target.value)}
              label="دوره زمانی"
              dir="rtl"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "secondary.dark",
                  },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.dark",
                  borderWidth: "2px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "primary.dark",
                    "& .MuiMenuItem-root": {
                      color: "text.primary",
                      "&:hover": {
                        backgroundColor: "secondary.dark",
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="ماه جاری">ماه جاری</MenuItem>
              <MenuItem value="ماه گذشته">ماه گذشته</MenuItem>
              <MenuItem value="سه‌ماهه">سه‌ماهه اخیر</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "secondary.main",
                "&.Mui-focused": {
                  color: "secondary.dark",
                },
              }}
            >
              تکنسین
            </InputLabel>
            <Select
              value={technician}
              onChange={(event)=> setTechnician(event.target.value)}
              label="تکنسین"
              dir="rtl"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "secondary.dark",
                  },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.dark",
                  borderWidth: "2px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "primary.dark",
                    "& .MuiMenuItem-root": {
                      color: "text.primary",
                      "&:hover": {
                        backgroundColor: "secondary.dark",
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="همه تکنسین‌ها">همه تکنسین‌ها</MenuItem>
              {technicians.map(technician=>
                <MenuItem value={technician.first_name}>{technician.first_name} {technician.last_name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.2,
              color: "primary.main",
              "&.MuiButton-containedPrimary": {
                backgroundColor: "secondary.main",
                color: "text",
              },
              "&.MuiButton-containedPrimary:hover": {
                backgroundColor: "secondary.light",
              },
              "&.Mui-disabled": {
                backgroundColor: "secondary.dark",
                color: "text.contrastText",
              },
            }}
          >
            نمایش گزارش
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
