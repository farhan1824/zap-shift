import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthCotext } from "../../Context/Authentication/AuthCotext";
import Loading from "../Loading/Loading";
import useUserRole from "../../Hooks/UserRoleCheck";

export const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthCotext);
  const location = useLocation();
  const { role, isRoleLoading } = useUserRole();

  if (loading || isRoleLoading) {
    return <Loading />;
  }

  // Not logged in → go login
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Logged in but NOT admin → forbidden page
  if (role !== "admin") {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};