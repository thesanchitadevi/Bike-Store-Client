import { ReactNode } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentToken } from "../../../redux/features/auth/authSlice";
import { decodeToken } from "../../../utils/decodeToken";
import { Navigate } from "react-router-dom";
import { JwtPayload } from "jwt-decode";

// Define custom token type
interface CustomJwtPayload extends JwtPayload {
  role: string;
}

type TProtectedLayout = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedLayout = ({ children, role }: TProtectedLayout) => {
  const token = useAppSelector(selectCurrentToken);
  let user;

  if (token) {
    user = decodeToken(token) as CustomJwtPayload;
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
