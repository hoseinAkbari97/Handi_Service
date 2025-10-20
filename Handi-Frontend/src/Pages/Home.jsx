import { Typography } from "@mui/material";
import { BrowserRouter, Link } from "react-router-dom";

function HomePage() {
  return (
    <BrowserRouter>
      <Typography variant="h3" align="center">This is Home Page</Typography>
      <Typography align="center" variant="h6">
      <Link to="/login">Login</Link>
      </Typography>
    </BrowserRouter>
  );
}

export default HomePage;
