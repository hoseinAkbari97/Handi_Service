import { useContext } from "react";
import { Box, Drawer } from "@mui/material";
import { UserContext } from "../../Contexts/UserContext";
import DashboardSidebar from "./DashboardSidebar";


export default function DashboardSidebarDrawer({ open, setOpen }) {
  const { user } = useContext(UserContext);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: { xs: "block", sm: "none" } }}
    >
      {user ? (
        <DashboardSidebar role={user.role} user={user} onClose={() => setOpen(false)} />
      ) : (
        <Box sx={{ p: 4, textAlign: "center", color: "text.contrastText" }}>
          در حال بارگذاری...
        </Box>
      )}
    </Drawer>
  );
}
