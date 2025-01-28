import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import NotFound from "../pages/notfound/NotFound";
import ProductsPage from "../pages/products/ProductsPage";
import OrderPage from "../pages/orders/OrderPage";
import AboutPage from "../pages/about/AboutPage";
import Services from "../pages/services/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/orders",
        element: <OrderPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/services",
        element: <Services />,
      },
    ],
  },
]);

export default router;
