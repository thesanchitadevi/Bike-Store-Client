import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { decodeToken } from "../utils/decodeToken";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const token = useAppSelector(selectCurrentToken);
  let user;

  if (token) {
    user = decodeToken(token);
  }

  if (!token || !user) {
    sessionStorage.setItem("lastPath", location.pathname + location.search); // Store the full path including query params
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
