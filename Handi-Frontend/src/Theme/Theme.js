import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {main: "#D96C2B"},
    secondary: {main: "#ff9800"},
    background: {default: "#f9f9f9"}
  },
  typography: {fontFamily: `'vazirmatn', Roboto, Arial`},
  direction: "rtl",
});

export default theme;