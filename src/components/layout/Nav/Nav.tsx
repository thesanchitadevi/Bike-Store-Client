import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/Logo";

// Array containing navigation items
const navItems = [
  { id: 1, text: "Products", link: "/products" },
  { id: 2, text: "Orders", link: "/orders" },
  { id: 3, text: "About", link: "/about" },
];

const Nav = () => {
  const location = useLocation();
  console.log(location);
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
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
              className="p-4 rounded-xl cursor-pointer duration-300  hover:text-[#23449e]"
            >
              <NavLink to={item.link}>
                {" "}
                <span
                  className={`cursor-pointer hover:text-primary-red transition-all duration-300 ${
                    item.link === location.pathname ? "text-primary-red" : ""
                  }`}
                >
                  {item.text}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex-1 md:flex md:justify-end "></div>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full  bg-background backdrop-filter backdrop-blur-md  border-slate-600 bg-opacity-80 shadow-lg  ease-in-out duration-500"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }
        >
          {/* Mobile Logo */}
          {/* <h1 className="w-full text-2xl font-bold p-4 ">JobSolutions.</h1> */}

          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <li
              key={item.id}
              className="object-none object-center  rounded-xl m-5  p-2 cursor-pointer duration-300 hover:text-[#516cb6]"
            >
              <NavLink to={item.link}>
                {" "}
                <span
                  className={`cursor-pointer hover:text-primary-red transition-all duration-300 ${
                    item.link === location.pathname ? "text-primary-red" : ""
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
