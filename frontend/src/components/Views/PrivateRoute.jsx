import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "store";
import { PATHS } from "constants";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to={PATHS.LOG_IN} />;
};

export { PrivateRoute };
