import React, { use } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthCotext } from "../../Context/Authentication/AuthCotext";
import Loading from "../Loading/Loading";
// import { AuthCotext } from "../Context/Authentication/AuthCotext";

export const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthCotext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
    // return <p className="text-center mt-10">Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/signin" replace />;
  }

  return children;
};