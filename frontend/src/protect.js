import React from "react";
import { Navigate } from "react-router-dom";

export const Protect = ({ children }) => {
  let isLoggedIn = window.localStorage.getItem("email");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// export default Protect;

export const AdminProtect = ({ children }) => {
  let isLoggedIn = window.localStorage.getItem("role");
  return isLoggedIn === "admin" ? children : <Navigate to="/login" />;
};

export const DriverProtect = ({ children }) => {
  let isLoggedIn = window.localStorage.getItem("role");
  return isLoggedIn === "driver" ? children : <Navigate to="/login" />;
};

export const UserProtect = ({ children }) => {
  let isLoggedIn = window.localStorage.getItem("role");
  return isLoggedIn === "user" ? children : <Navigate to="/login" />;
};
