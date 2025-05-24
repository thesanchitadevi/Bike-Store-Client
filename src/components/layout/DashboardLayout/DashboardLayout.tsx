import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";

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
  FaCog,
  FaBell,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { logout } from "../../../redux/features/auth/authSlice";
import { AiFillProduct } from "react-icons/ai";
import { toast } from "sonner";
import { RootState } from "../../../redux/store";
import moment from "moment";
import Logo from "../../../assets/Logo";
import { FaUsersLine } from "react-icons/fa6";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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
    { name: "Users", path: "/admin/dashboard/users", icon: <FaUsersLine /> },
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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <p className="text-center py-4">Logging out...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left side - Mobile menu button and Logo */}
          <div className="flex items-center">
            {/* Mobile Hamburger Menu */}
            <button
              className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/" className="w-full text-3xl font-bold flex-1">
                <Logo />
              </NavLink>
            </div>
          </div>

          {/* Center - Search Bar */}

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FaBell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>

                  <Link
                    to={
                      user?.role === "admin"
                        ? "/admin/dashboard/myProfile"
                        : "/user/dashboard/myProfile"
                    }
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <FaUser className="mr-3 w-4 h-4 text-gray-400" />
                    My Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <FaCog className="mr-3 w-4 h-4 text-gray-400" />
                    Settings
                  </Link>

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3 w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40 pt-16`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {user?.name}
              <span className="block text-xs text-red-600 capitalize font-medium">
                {user?.role} Dashboard
              </span>
            </p>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {(user?.role === "admin" ? adminMenu : customerMenu).map(
                (item, index) => (
                  <li key={index}>
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {item.icon && (
                          <span className="mr-3 text-gray-500 group-hover:text-red-600 transition-colors">
                            {item.icon}
                          </span>
                        )}
                        <span className="text-gray-700 group-hover:text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleMenu(item.name)}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center">
                            {item.icon && (
                              <span className="mr-3 text-gray-500 group-hover:text-red-600 transition-colors">
                                {item.icon}
                              </span>
                            )}
                            <span className="text-gray-700 group-hover:text-gray-900">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-gray-400 group-hover:text-gray-600">
                            {openMenu === item.name ? (
                              <FaChevronUp className="w-4 h-4" />
                            ) : (
                              <FaChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        </button>
                        {"submenu" in item && item.submenu && (
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
                                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600 hover:text-gray-900 pl-10"
                                  onClick={() => setIsSidebarOpen(false)}
                                >
                                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
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

          <div className="border-t border-gray-300 pt-4 mt-4">
            <div className="text-xs text-gray-500 text-center mb-2">
              © {moment().format("yyyy")}. BikeStore
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
