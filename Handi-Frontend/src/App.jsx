import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, useRoutes, useNavigate } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import theme from "./Theme/Theme";
import routes from "./routes/routes";
import rtlCache from "./Theme/RTLCache";
import UserProvider from "./Contexts/UserContext";

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function UserProviderWrapper({ children }) {
  const navigate = useNavigate();

  return <UserProvider navigate={navigate}>{children}</UserProvider>;
}

function App() {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <UserProviderWrapper>
            <AppRoutes />
          </UserProviderWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
