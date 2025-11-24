import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import theme from "./Theme/Theme";
import routes from "./routes/routes";
import rtlCache from "./Theme/RTLCache";

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
