import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function GuestRoute() {
  if (localStorage.getItem("token") != null) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
}

export default GuestRoute;
