import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentToken,
} from "../../../redux/features/auth/authSlice";
import { decodeToken } from "../../../utils/decodeToken";
import { Navigate } from "react-router-dom";

type TProtectedLayout = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedLayout = ({ children, role }: TProtectedLayout) => {
  const token = useAppSelector(selectCurrentToken);
  let user;

  if (token) {
    user = decodeToken(token);
  }

  // const dispatch = useAppDispatch();

  if (role && user?.role !== role) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
      />
    );
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedLayout;
