import { useContext, useState } from "react";
import { Box, Typography, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./DashboardSidebar";
import { UserContext } from "../../Contexts/UserContext";

export default function Header({ title, button }) {
  const { user } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >

      {/* Top Header */}        
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            display: { xs: "flex", sm: "none" },
            backgroundColor: "primary.main",
            color: "secondary.main",
            "&:hover": { backgroundColor: "primary.light" },
          }}
        >
          <MenuIcon />
        </IconButton>
        {button}
      </Box>

      <Typography variant="h6" fontWeight="bold" color="primary">
        {title}
      </Typography>

      {/* Sidebar Drawer (just mobile display) */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {user ? (
          <Sidebar
            role={user.role}
            user={user}
            onClose={() => setOpen(false)}
          />
        ) : (
          <Box sx={{ p: 4, textAlign: "center", color: "text.contrastText" }}>
            در حال بارگذاری...
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
