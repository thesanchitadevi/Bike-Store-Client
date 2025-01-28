import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import moment from "moment";
import { Logo1 } from "../../../assets/Logo1";
import { workHours } from "./Footer.utils";

const items = [
  { id: 1, text: "Products", link: "/products" },
  { id: 2, text: "Orders", link: "/orders" },
  { id: 3, text: "About", link: "/about" },
  { id: 4, text: "Services", link: "/services" },
];

const social = [
  { id: 1, text: "Facebookl", link: "/facebool", icon: <FaFacebook /> },
  { id: 2, text: "Twitter", link: "/twitter", icon: <FaTwitter /> },
  { id: 3, text: "Instagram", link: "/instagram", icon: <FaInstagram /> },
  { id: 4, text: "LinkedIn", link: "/linkedin", icon: <FaLinkedin /> },
  { id: 5, text: "Youtube", link: "/youtube", icon: <FaYoutube /> },
];

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#1F2024] py-10 text-gray-100">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="w-full xl:w-1/5">
              <Link to="/" className="block w-56 mb-2">
                <Logo1 />
              </Link>
              <p className="w-full text-gray-300">
                We believe every ride tells a story. Let’s help you write yours!
                Explore our range of products and services today.
              </p>
            </div>

            <div className="px-4 mt-8 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-xl pb-8">Company</h2>
              </div>
              <ul className="leading-4 space-y-4 ">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="cursor-pointer  font-medium  text-gray-300 hover:text-[#BD2A2E]"
                  >
                    <Link to={item.link}>
                      {" "}
                      <span
                        className={`cursor-pointer hover:text-[#BD2A2E] transition-all duration-300  ${
                          item.link === location.pathname
                            ? "text-primary-red"
                            : ""
                        }`}
                      >
                        {item.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4 mt-8 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-xl pb-8">Our Hours</h2>
              </div>
              <ul className="leading-4 space-y-4">
                {workHours.map((item) => (
                  <li className="cursor-pointer  text-gray-300 hover:text-[#BD2A2E]">
                    {item.day}: {item.hours}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4 mt-8 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-xl pb-8">Connect With Us</h2>
              </div>
              <div>
                <ul className="flex items-center space-x-4">
                  {social.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.link}
                        className="text-2xl  text-gray-300 hover:text-[#BD2A2E]"
                      >
                        {item.icon}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1F2024] py-4 text-gray-100 border-t border-[#2C2D31]">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              © {moment().format("yyyy")}.{" "}
              <span className="text-[#BD2A2E] font-semibold">Bike</span> All
              rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
