import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import PrivateRoutes from "./PrivateRoutes";

import CustomerDashboard from "../Pages/Customer/CustomerDashboard";
import CustomerDashboardPanel from "../Pages/Customer/Pages/Dashboard";
import CreateRequest from "../Pages/Customer/Pages/CreateRequest";
import MyRequests from "../Pages/Customer/Pages/MyRequests";
import CustomerEditProfile from "../Pages/Customer/Pages/Profile"
import CustomerWallet from "../Pages/Customer/Pages/Wallet";
import CustomerSettings from "../Pages/Customer/Pages/Settings";

import TechnicianDashboard from "../Pages/Technician/TechnicianDashboard";
import TechnicianDashboardPanel from "../Pages/Technician/Pages/Dashboard";
import TechnicianManageTasks from "../Pages/Technician/Pages/ManageTasks";
import TechnicianWorkCalendar from "../Pages/Technician/Pages/WorkCalendar";
import TechnicianMessages from "../Pages/Technician/Pages/Messages";
import TechnicianEditProfile from "../Pages/Technician/Pages/Profile";
import TechnicianSettings from "../Pages/Technician/Pages/Settings";

import AgentDashboard from "../Pages/Agent/AgentDashboard";
import AgentDashboardPanel from "../Pages/Agent/Pages/Dashboard";
import AgentManageTasks from "../Pages/Agent/Pages/ManageTasks";
import AgentMessages from "../Pages/Agent/Pages/Messages";
import AgentEditProfile from "../Pages/Agent/Pages/Profile";
import AgentReports from "../Pages/Agent/Pages/Reports";
import AgentSettings from "../Pages/Agent/Pages/Setting";
import TeamTechnicians from "../Pages/Agent/Pages/TeamTechnicians";



const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    element: <PrivateRoutes />,
    children: [
      { path: "/customer",
        element: <CustomerDashboard />,
        children:[
          {index: true, element: <CustomerDashboardPanel/>},
          { path: "request-page", element: <CreateRequest /> },
          { path: "my-requests", element: <MyRequests /> },
          { path: "profile", element: <CustomerEditProfile /> },
          { path: "wallet", element: <CustomerWallet /> },
          { path: "settings", element: <CustomerSettings /> },
        ]
      },
      {
        path: "/technician",
        element: <TechnicianDashboard />,
        children: [
          { index: true, element: <TechnicianDashboardPanel /> },
          { path: "manage-tasks", element: <TechnicianManageTasks /> },
          { path: "work-calendar", element: <TechnicianWorkCalendar /> },
          { path: "messages", element: <TechnicianMessages /> },
          { path: "profile", element: <TechnicianEditProfile /> },
          { path: "settings", element: <TechnicianSettings /> },
        ],
      },
      {
        path: "/agent",
        element: <AgentDashboard />,
        children: [
          { index: true, element: <AgentDashboardPanel /> },
          { path: "manage-tasks", element: <AgentManageTasks /> },
          { path: "messages", element: <AgentMessages /> },
          { path: "profile", element: <AgentEditProfile /> },
          { path: "reports", element: <AgentReports /> },
          { path: "settings", element: <AgentSettings /> },
          { path: "team-technicians", element: <TeamTechnicians /> },
        ],
      },
    ],
  },
];

export default routes;
