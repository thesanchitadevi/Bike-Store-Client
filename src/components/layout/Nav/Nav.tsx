import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo";
import { ShoppingCart, UserRound } from "lucide-react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCartCount } from "../../../redux/features/cart/cartSlice";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import ProfileDropDown from "./ProfileDropDown";

// Array containing navigation items
const navItems = [
  { id: 1, text: "Products", link: "/products" },
  { id: 4, text: "Services", link: "/services" },
  { id: 3, text: "About", link: "/about" },
  { id: 2, text: "Contact", link: "/contact" },
];

interface NavProps {
  openCartSidebar: () => void;
}

const Nav = ({ openCartSidebar }: NavProps) => {
  // Cart Count Selector
  const cartCount = useAppSelector(selectCartCount);
  const user = useAppSelector(selectCurrentUser);

  const location = useLocation();
  const navigate = useNavigate();

  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Function to handle user icon click
  const handleUserIconClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowProfileDropdown((prev) => !prev);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md backdrop-filter border-b border-gray-200">
      <div className="flex justify-between items-center h-20 max-w-7xl mx-auto md:px-0 px-5">
        {/* Logo */}
        <NavLink to="/" className="w-full text-3xl font-bold flex-1">
          <Logo />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:flex-1 md:justify-center">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="p-4 font-semibold text-medium cursor-pointer duration-300 hover:text-[#BD2A2E]"
            >
              <NavLink to={item.link}>
                <span
                  className={`cursor-pointer hover:text-[#BD2A2E] transition-all duration-300 ${
                    item.link === location.pathname ? "text-[#BD2A2E]" : ""
                  }`}
                >
                  {item.text}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="md:flex-1 md:flex md:justify-end">
          {/* Cart Button */}
          <button
            onClick={openCartSidebar}
            className="relative p-4 cursor-pointer "
          >
            <ShoppingCart />
            {
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            }
          </button>

          {/* User Icon */}
          {user ? (
            <>
              <button
                onClick={handleUserIconClick}
                className="p-4 cursor-pointer"
              >
                <UserRound />
              </button>
              {showProfileDropdown && <ProfileDropDown />}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="p-4 cursor-pointer"
            >
              Login
            </button>
          )}
        </div>

        <>
          {/* Mobile Navigation Icon */}
          <div onClick={handleNav} className="block md:hidden ml-2">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`fixed top-0 left-0 h-screen w-[70%] bg-white shadow-lg transform ${
              nav ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 z-50`}
          >
            <div className="p-4 border-b border-gray-200">
              {/* Mobile Logo */}
              <NavLink to="/" className="text-2xl font-bold">
                <Logo />
              </NavLink>
            </div>

            <ul className="mt-4">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 duration-300"
                >
                  <NavLink
                    to={item.link}
                    className={`block text-gray-700 hover:text-[#BD2A2E] transition-all duration-300 ${
                      item.link === location.pathname ? "text-[#BD2A2E]" : ""
                    }`}
                  >
                    {item.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Overlay to close sidebar when clicking outside */}
          {/* This div covers the entire screen with a semi-transparent background when the sidebar is open */}
          {/* Clicking anywhere on this overlay will close the sidebar by calling handleNav */}
          {nav && (
            <div
              className="fixed inset-0 bg-black/10 bg-opacity-90 z-40"
              onClick={handleNav}
            ></div>
          )}
        </>
      </div>
    </div>
  );
};

export default Nav;
