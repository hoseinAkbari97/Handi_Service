import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard";
import TechnicianDashboard from "./Pages/Technician/TechnicianDashboard";
import AgentDashboard from "./Pages/Agent/AgentDashboard"
import TeamTechnicians from "./Pages/Agent/Pages/TeamTechnicians";
import Dashboard from "./Pages/Agent/Pages/Dashboard";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/customer", element: <CustomerDashboard /> },
  { path: "/technician", element: <TechnicianDashboard /> },
  { path: "/agent", element: <AgentDashboard />, children:[
    { index: true, element: <Dashboard /> },
    {path: "team-technicians", element: <TeamTechnicians/>}
  ] },
];

export default routes