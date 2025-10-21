import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {main: "#1A423A"},
    secondary: {main: "#D4AF37"},
    background: {default: "#EFE6D5", paper:"#e6f7f7" },
    text:{primary: "#FFFFFF", secondary:"#D9B55A", contrastText:"#0A3D3F"}
  },
  typography: {fontFamily: `'vazirmatn', Roboto, Arial`},
  direction: "rtl",
});

export default theme;