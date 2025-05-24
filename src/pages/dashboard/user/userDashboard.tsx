import { TrendingUp, Package, ShoppingCart, Clock } from "lucide-react";
import Loading from "../../../components/ui/Loading";
import { useMyOrdersQuery } from "../../../redux/features/order/order.api";
import { Link } from "react-router-dom";

type OrderStatus = "paid" | "pending" | "delivered" | string;

const UserDashboard = () => {
  const { data: ordersResponse, isLoading } = useMyOrdersQuery([]);
  const orders = ordersResponse?.data || [];

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) return <Loading />;

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    trend,
    trendValue,
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    trend?: "up" | "down";
    trendValue?: string;
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && (
            <div
              className={`flex items-center text-sm ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp
                className={`w-4 h-4 mr-1 ${
                  trend === "down" ? "rotate-180" : ""
                }`}
              />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600">
                Here's your recent activity and order summary
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={ShoppingCart}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend="up"
            trendValue="5%"
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            icon={Clock}
            color="bg-gradient-to-r from-yellow-500 to-orange-500"
            trend={pendingOrders > 0 ? "down" : undefined}
            trendValue={pendingOrders > 0 ? "3%" : undefined}
          />
          <StatCard
            title="Delivered Orders"
            value={deliveredOrders}
            icon={Package}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend="up"
            trendValue="8%"
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Recent Orders
              </h2>
              <p className="text-gray-600">Your most recent purchases</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>

          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
              >
                <div className="mb-3 sm:mb-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-medium text-gray-800">
                      {order.products[0]?.product?.name || "Order"}
                    </p>
                    {order.products.length > 1 && (
                      <span className="text-sm text-gray-500">
                        +{order.products.length - 1} more
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(order?.createdAt ?? "").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {order.totalPrice.toFixed(2)} BDT
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No orders found. Start shopping now!
              </div>
            )}
          </div>

          {orders.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                to="user/dashboard/myOrders"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View all orders →
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/products"
              className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] text-center"
            >
              <ShoppingCart className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Shop Now</span>
            </Link>
            <Link
              to="user/dashboard/myOrders"
              className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] text-center"
            >
              <Package className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">View All Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
