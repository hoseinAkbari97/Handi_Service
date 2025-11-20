import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/Theme.js";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/vazirmatn";
import UserProvider from "./Contexts/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
