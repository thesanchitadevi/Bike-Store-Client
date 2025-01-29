import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import { useState } from "react";
import CartSidebar from "../../../pages/cart/CartSideBar";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="font-Roboto">
      <Nav openCartSidebar={() => setIsCartOpen(true)} />
      <Outlet />
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
};

export default MainLayout;
