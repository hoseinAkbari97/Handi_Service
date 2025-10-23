import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./Theme/Theme";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Customer from "./Pages/Customer/CustomerDashboard";
import Technicians from "./Pages/Technician/Technicians";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/technicians" element={<Technicians />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;