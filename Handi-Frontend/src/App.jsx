import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, useRoutes } from "react-router-dom";
import theme from "./Theme/Theme";
import routes from "./routes/routes";

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
