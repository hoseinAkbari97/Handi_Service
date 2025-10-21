import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="صفحه اصلی" />
        </ListItem>
        <ListItem>
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="تعمیرکاران" />
        </ListItem>
        <ListItem>
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="سفارش‌ها" />
        </ListItem>
      </List>
    </Drawer>
  );
}