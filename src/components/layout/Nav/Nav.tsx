import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/Logo";
import { ShoppingCart, UserRound } from "lucide-react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCartCount } from "../../../redux/features/cart/cartSlice";

// Array containing navigation items
const navItems = [
  { id: 1, text: "Products", link: "/products" },
  { id: 2, text: "Contact", link: "/contact" },
  { id: 3, text: "About", link: "/about" },
  { id: 4, text: "Services", link: "/services" },
];

const Nav = ({ openCartSidebar }) => {
  //Cart
  const cartCount = useAppSelector(selectCartCount);

  const location = useLocation();

  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  /* Cart Count logic */

  return (
    <>
      <div className="flex justify-between items-center h-24 max-w-7xl mx-auto md:px-0  px-5">
        {/* Logo */}
        <NavLink to="/" className="w-full text-3xl font-bold flex-1">
          <Logo />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:flex-1 md:justify-center">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="p-4 r font-semibold text-medium cursor-pointer duration-300 hover:text-[#BD2A2E]"
            >
              <NavLink to={item.link}>
                {" "}
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

        <div className="md:flex-1 md:flex md:justify-end ">
          {/* Cart Button */}
          <button
            onClick={openCartSidebar}
            className="relative p-4 cursor-pointer"
          >
            <ShoppingCart />
            {
              // Cart Count
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            }
          </button>
          <NavLink to="/login">
            <button className="py-4 px-2 cursor-pointer ">
              <UserRound />
            </button>
          </NavLink>
        </div>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className="block md:hidden ml-2">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full  bg-background backdrop-filter backdrop-blur-md  border-slate-600 bg-opacity-80 shadow-lg  ease-in-out duration-500 pt-15"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }
        >
          {/* Mobile Logo */}
          <div className="w-full text-2xl font-bold px-4">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>

          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <li
              key={item.id}
              className="object-none object-center m-5 p-2 cursor-pointer duration-300 hover:text-[#BD2A2E] text-gray-700"
            >
              <NavLink to={item.link}>
                {" "}
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

          {/* Mobile Navigation Link */}
          <div className="md:hidden flex justify-center mx-2"></div>
        </ul>
      </div>
    </>
  );
};

export default Nav;
