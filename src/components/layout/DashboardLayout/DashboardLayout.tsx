import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingBag,
  FaBox,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { logout } from "../../../redux/features/auth/authSlice";
import { AiFillProduct } from "react-icons/ai";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaBox />,
    },
    {
      name: "Products",
      path: "/admin/dashboard/products",
      icon: <AiFillProduct />,
    },
    { name: "Orders", path: "/admin/dashboard/orders", icon: <FaList /> },
    { name: "Users", path: "/admin/dashboard/users", icon: <FaUser /> },
  ];

  const customerMenu = [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <FaBox />,
    },
    {
      name: "My Orders",
      path: "/user/dashboard/myOrders",
      icon: <FaShoppingBag />,
    },
    { name: "Profile", path: "/user/dashboard/myProfile", icon: <FaUser /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Hamburger Menu */}
      <button
        className="lg:hidden fixed top-4 right-4 p-2 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 p-4">
            <h2 className="text-xl font-bold">
              Welcome, {user?.name}
              <span className="block text-sm text-gray-500">{user?.role}</span>
            </h2>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {(user?.role === "admin" ? adminMenu : customerMenu).map(
                (item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="border-t pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
