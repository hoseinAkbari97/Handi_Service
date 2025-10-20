import { ThemeProvider, CssBaseline} from "@mui/material";
import theme from "./Theme/Theme";
import MainLayout from "./Layout/MainLayout";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
