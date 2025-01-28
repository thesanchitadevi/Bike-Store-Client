import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";

const MainLayout = () => {
  return (
    <div className="font-Roboto">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
