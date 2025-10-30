import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, useRoutes } from "react-router-dom";
import theme from "./Theme/Theme";
import routes from "./routes.jsx";

function AppRoutes() {
  const router = useRoutes(routes);
  return router;
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
