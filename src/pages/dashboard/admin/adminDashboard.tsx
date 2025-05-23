import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  ChartOptions,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Clock,
  CreditCard,
  Activity,
  Eye,
} from "lucide-react";
import { useAllOrdersQuery } from "../../../redux/features/order/order.api";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";
import { useGetAllUsersQuery } from "../../../redux/features/admin/admin.api";
import { Link } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const AdminDashboard = () => {
  const { data: orders } = useAllOrdersQuery([]);
  const { data: products } = useGetAllProductsQuery([]);
  const { data: users } = useGetAllUsersQuery([]);

  // Stats calculations using real data
  const totalProducts = Array.isArray(products?.data)
    ? products.data.length
    : 0;
  const totalOrders = Array.isArray(orders?.data) ? orders.data.length : 0;
  const totalUsers = Array.isArray(users?.data) ? users.data.length : 0;

  const pendingOrders = Array.isArray(orders?.data)
    ? orders.data.filter((order) => order.orderStatus === "Pending").length
    : 0;

  const pendingPayments = Array.isArray(orders?.data)
    ? orders.data.filter((order) => order.status === "Pending").length
    : 0;

  // Chart data preparation using real data
  const orderStatusData = {
    labels: ["Pending", "Completed", "Shipped"],
    datasets: [
      {
        data: [
          orders?.data?.filter((o) => o.orderStatus === "Pending").length || 0,
          orders?.data?.filter((o) => o.orderStatus === "Completed").length ||
            0,
          orders?.data?.filter((o) => o.orderStatus === "Shipped").length || 0,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: calculateMonthlyRevenue(
          (orders?.data || [])
            .filter(
              (o) =>
                typeof o.createdAt === "string" &&
                typeof o.totalPrice === "number"
            )
            .map((o) => ({
              createdAt: o.createdAt as string,
              totalPrice: o.totalPrice as number,
            }))
        ),
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        borderColor: "rgba(168, 85, 247, 1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  function calculateMonthlyRevenue(
    orders: Array<{ createdAt: string; totalPrice: number }>
  ) {
    const monthlyRevenue = Array(6).fill(0); // Initialize array for 6 months

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const monthIndex = orderDate.getMonth(); // Get month index (0-5 for Jan-Jun)
      const revenue = order.totalPrice; // Assuming totalPrice is the revenue for the order
      monthlyRevenue[monthIndex] += revenue;
    });

    return monthlyRevenue;
  }

  // StatCard component remains the same
  type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    trend?: "up" | "down";
    trendValue?: string | number;
  };

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    color,
    trend,
    trendValue,
  }) => (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg  border border-gray-100 `}
    >
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
        <div className={`p-3 rounded-xl ${color} `}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );

  // Doughnut-specific options
  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        cornerRadius: 8,
        padding: 12,
      },
    },
  };

  // Bar-specific options
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome Back, Admin
              </h1>
              <p className="text-lg text-gray-600">
                Here's what's happening with your business today
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="bg-white p-3 rounded-xl shadow-md">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Total Products"
            value={totalProducts.toLocaleString()}
            icon={Package}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Total Orders"
            value={totalOrders.toLocaleString()}
            icon={ShoppingCart}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend="up"
            trendValue="8%"
          />
          <StatCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            icon={Users}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            trend="up"
            trendValue="15%"
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders.toLocaleString()}
            icon={Clock}
            color="bg-gradient-to-r from-yellow-500 to-orange-500"
            trend="down"
            trendValue="3%"
          />
          <StatCard
            title="Pending Payments"
            value={pendingPayments.toLocaleString()}
            icon={CreditCard}
            color="bg-gradient-to-r from-red-500 to-red-600"
            trend="down"
            trendValue="5%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Status Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Order Status Distribution
                </h3>
                <p className="text-gray-600">Current order status breakdown</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="h-80">
              <Doughnut data={orderStatusData} options={doughnutOptions} />
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Monthly Revenue Trend
                </h3>
                <p className="text-gray-600">
                  Revenue growth over the past 6 months
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="h-80">
              <Bar data={monthlyRevenueData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Package className="w-6 h-6 mx-auto mb-2" />
              <Link
                to="/admin/dashboard/products/add"
                className="text-sm font-medium"
              >
                Add Product
              </Link>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
              <ShoppingCart className="w-6 h-6 mx-auto mb-2" />
              <Link
                to="/admin/dashboard/orders"
                className="text-sm font-medium"
              >
                View Orders
              </Link>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <Link to="/admin/dashboard/users" className="text-sm font-medium">
                Manage Users
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
