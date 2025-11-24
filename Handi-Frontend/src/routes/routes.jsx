import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import CustomerDashboard from "../Pages/Customer/CustomerDashboard";
import TechnicianDashboard from "../Pages/Technician/TechnicianDashboard";
import AgentDashboard from "../Pages/Agent/AgentDashboard";
import AgentDashboardPanel from "../Pages/Agent/Pages/Dashboard";
import TechnicianDashboardPanel from "../Pages/Technician/Pages/Dashboard";
import ManageTasks from "../Pages/Agent/Pages/ManageTasks";
import Messages from "../Pages/Agent/Pages/Messages";
import AgentEditProfile from "../Pages/Agent/Pages/Profile";
import TechnicianEditProfile from "../Pages/Technician/Pages/Profile";
import Reports from "../Pages/Agent/Pages/Reports";
import Setting from "../Pages/Agent/Pages/Setting";
import TeamTechnicians from "../Pages/Agent/Pages/TeamTechnicians";
import PrivateRoutes from "./PrivateRoutes";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    element: <PrivateRoutes />,
    children: [
      { path: "/customer", element: <CustomerDashboard /> },
      {
        path: "/technician",
        element: <TechnicianDashboard />,
        children: [
          { index: true, element: <TechnicianDashboardPanel /> },
          { path: "profile", element: <TechnicianEditProfile /> },
        ],
      },
      {
        path: "/agent",
        element: <AgentDashboard />,
        children: [
          { index: true, element: <AgentDashboardPanel /> },
          { path: "manage-tasks", element: <ManageTasks /> },
          { path: "messages", element: <Messages /> },
          { path: "profile", element: <AgentEditProfile /> },
          { path: "reports", element: <Reports /> },
          { path: "setting", element: <Setting /> },
          { path: "team-technicians", element: <TeamTechnicians /> },
        ],
      },
    ],
  },
];

export default routes;
