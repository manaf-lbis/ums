import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../Redux/authSlice";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { auth, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  // const dispatch = useDispatch();

  // Logout the user if they are inactive
  // useEffect(() => {
  //   if (auth && !auth.isActive) {
  //     dispatch(logout());
  //   }
  // }, [auth, dispatch]);

  if (loading) return <h2>Loading...</h2>;


  if (!auth) return <Navigate to="/" state={{ from: location }} replace />;


  if (auth.role === "user" && location.pathname === "/dashboard") {
    return <Navigate to="/home" replace />;
  }

  if (auth.role === "admin" && location.pathname === "/home") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
