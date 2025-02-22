/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "../../../components/ui/Loading";
import { useMyOrdersQuery } from "../../../redux/features/order/order.api";

const UserDashboard = () => {
  const { data: ordersResponse, isLoading } = useMyOrdersQuery([]);

  const orders = ordersResponse?.data || [];

  const getStatusBadgeStyle = (status: any) => {
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

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Manage your account and activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Pending Orders</h3>

            <p className="text-2xl font-bold text-gray-800">
              {orders.filter((order) => order.status === "pending").length}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <p className="text-lg text-gray-800 font-medium">
                      {order.products[0]?.product?.name}
                    </p>
                    {order.products.length > 1 && (
                      <span className="text-sm text-gray-500">
                        + {order.products.length - 1} more
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    Order Date:{" "}
                    {new Date(order?.createdAt ?? "").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="text-right flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {order.totalPrice} BDT
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusBadgeStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No recent orders found
              </p>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Need assistance? Contact our support team
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
