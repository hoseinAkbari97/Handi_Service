import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

export default function SelectDate({selectedDate, setSelectedDate}) {
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fa">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="تاریخ مورد نظر"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            calendar="jalali"
            format="YYYY/MM/DD"
            sx={{
              borderRadius: "5px",
              width: "100%",
              bgcolor: "primary.main",
              "& .MuiIconButton-root": {
                color: "secondary.main",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "text.primary",
              },
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 2px",
                  borderColor: "secondary.main",
                },
              },
            }}
            slotProps={{
              desktopPaper: {
                sx: {
                  borderRadius: 4,
                  backgroundColor: "primary.light",
                  border: "solid 1px",
                  borderColor: "secondary.dark",
                },
              },

              calendarHeader: {
                sx: {
                  "& .MuiIconButton-root": {
                    color: "secondary.main",
                  },
                  "& .MuiIconButton-root:hover": {
                    backgroundColor: "secondary.main",
                    color: "text.primary",
                  },
                  "& .MuiIconButton-root": {
                    color: "text.primary",
                  },
                  "& .MuiPickersCalendarHeader-label": {
                    color: "text.primary",
                  },
                },
              },

              day: {
                sx: {
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },

                  "&.MuiPickersDay-today": {
                    borderColor: "secondary.main",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  },

                  "&.Mui-selected": {
                    backgroundColor: "primary.main",

                    color: "secondary.light",

                    "&:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  },
                },
              },

              toolbar: {
                sx: {
                  "& .MuiPickersToolbar-title": {
                    color: "primary.main",
                  },
                },
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  )
}
