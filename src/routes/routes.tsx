import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import NotFound from "../pages/notfound/NotFound";
import ProductsPage from "../pages/products/ProductsPage";
import OrderPage from "../pages/orders/OrderPage";
import AboutPage from "../pages/about/AboutPage";
import Services from "../pages/services/Services";
import ProductsDetails from "../pages/products/ProductsDetails";
import CartPage from "../pages/cart/CartPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ProtectedLayout from "../components/layout/ProtectedLayout/ProtectedLayout";
import DashboardLayout from "../components/layout/DashboardLayout/DashboardLayout";
import UserDashboard from "../pages/dashboard/user/userDashboard";
import OrderResponse from "../pages/orders/OrderResponse";
import UserOrders from "../pages/dashboard/user/userOrders";

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
        path: "/product/:id",
        element: <ProductsDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/orders",
        element: <OrderPage />,
      },
      {
        path: "orders/verify",
        element: <OrderResponse />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
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
  {
    path: "/user/dashboard",
    element: (
      <ProtectedLayout role="customer">
        <DashboardLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: "/user/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/user/dashboard/myOrders",
        element: <UserOrders />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
