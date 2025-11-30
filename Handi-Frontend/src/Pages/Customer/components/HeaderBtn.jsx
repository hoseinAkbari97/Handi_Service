import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const HeaderBtn = () => {
  return (
    <Link to="/customer/request-page" style={{ textDecoration: "none" }}>
      <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
        درخواست تعمیر جدید
      </Button>
    </Link>
  );
};
