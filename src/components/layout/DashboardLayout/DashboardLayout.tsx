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
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { logout } from "../../../redux/features/auth/authSlice";
import { AiFillProduct } from "react-icons/ai";
import { toast } from "sonner";
import { RootState } from "../../../redux/store";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaBox />,
    },
    {
      name: "Products",
      icon: <AiFillProduct />,
      submenu: [
        { name: "Add Product", path: "/admin/dashboard/products/add" },
        { name: "All Products", path: "/admin/dashboard/products" },
      ],
    },
    {
      name: "Orders",
      icon: <FaList />,
      submenu: [
        { name: "Add Orders", path: "/admin/dashboard/orders/add" },
        { name: "All Orders", path: "/admin/dashboard/orders" },
      ],
    },
    { name: "Users", path: "/admin/dashboard/users", icon: <FaUser /> },
    { name: "Profile", path: "/admin/dashboard/myProfile", icon: <FaUser /> },
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

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to log out. Please try again.");
      console.error("Failed to logout", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-4">Logging out...</p>;

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
                (item, index) => (
                  <li key={index}>
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.name}
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleMenu(item.name)}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            {item.icon && (
                              <span className="mr-3">{item.icon}</span>
                            )}
                            {item.name}
                          </div>
                          {openMenu === item.name ? (
                            <FaChevronUp className="w-4 h-4" />
                          ) : (
                            <FaChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        {item.submenu && (
                          <ul
                            className={`pl-6 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
                              openMenu === item.name
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            {item.submenu.map((subitem, subindex) => (
                              <li key={subindex}>
                                <Link
                                  to={subitem.path}
                                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                                >
                                  {subitem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
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
