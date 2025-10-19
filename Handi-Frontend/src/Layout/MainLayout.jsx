import { Box } from "@mui/material";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Home from "../Pages/Home";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, backgroundColor: "#f9f9f9" }}>
        <Header />
        <Home />
      </Box>
    </Box>
  );
}