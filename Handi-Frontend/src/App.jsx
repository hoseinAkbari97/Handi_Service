import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./Theme/Theme";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard";
import TechnicianDashboard from "./Pages/Technician/TechnicianDashboard";
import AgentDashboard from "./Pages/Agent/AgentDashboard"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/technician" element={<TechnicianDashboard />} />
          <Route path="/agent" element={<AgentDashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;