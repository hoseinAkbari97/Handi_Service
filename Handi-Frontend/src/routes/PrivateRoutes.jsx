import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
  const isValid = localStorage.getItem("isValid") === "true";
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!isValid) {
    return <Navigate to="/" replace />;
  }
  if (
    (location.pathname.startsWith("/agent") && role !== "agent") ||
    (location.pathname.startsWith("/technician") && role !== "technician") ||
    (location.pathname.startsWith("/customer") && role !== "customer")
  ) {
    localStorage.removeItem("isValid");
    localStorage.removeItem("role");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
