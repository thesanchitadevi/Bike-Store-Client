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
import ContactPage from "../pages/Contact/ContactPage";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProfile from "../pages/dashboard/user/userProfile";
import AdminDashboard from "../pages/dashboard/admin/adminDashboard";
import AdminProfile from "../pages/dashboard/admin/adminProfile";
import AdminDashboardUsers from "../pages/dashboard/admin/users/users";
import AdminDashboardAllProducts from "../pages/dashboard/admin/products/allProducts";
import AdminDashboardProductAdd from "../pages/dashboard/admin/products/addProduct";
import AdminDashboardOrderAdd from "../pages/dashboard/admin/orders/addOrders";
import AdminDashboardAllOrders from "../pages/dashboard/admin/orders/allOrders";
import FaqPage from "../pages/faq/Faq";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        element: (
          <ProtectedRoutes>
            <OrderPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "orders/verify",
        element: (
          <ProtectedRoutes>
            <OrderResponse />
          </ProtectedRoutes>
        ),
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
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedLayout role="admin">
        <DashboardLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/dashboard/myProfile",
        element: <AdminProfile />,
      },
      {
        path: "/admin/dashboard/products/add",
        element: <AdminDashboardProductAdd />,
      },
      {
        path: "/admin/dashboard/products",
        element: <AdminDashboardAllProducts />,
      },
      {
        path: "/admin/dashboard/orders/add",
        element: <AdminDashboardOrderAdd />,
      },
      {
        path: "/admin/dashboard/orders",
        element: <AdminDashboardAllOrders />,
      },
      {
        path: "/admin/dashboard/users",
        element: <AdminDashboardUsers />,
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
      {
        path: "/user/dashboard/myProfile",
        element: <UserProfile />,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
