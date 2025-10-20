import { Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Typography variant="h3" align="center">
        This is Home Page
      </Typography>
      <Typography align="center" variant="h6">
        <MuiLink component={Link} to="/login">
          Login
        </MuiLink>
      </Typography>
    </>
  );
}
