import { useState, useEffect } from "react";
import { useMyOrdersQuery } from "../../../redux/features/order/order.api";

const UserOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ordersResponse, isLoading } = useMyOrdersQuery({
    page: currentPage,
    limit: 10,
  });

  const orders = ordersResponse?.data || [];
  const meta = ordersResponse?.meta || {};

  useEffect(() => {
    if (meta.page !== undefined && meta.page !== currentPage) {
      setCurrentPage(meta.page);
    }
  }, [meta.page]);

  const getStatusBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
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

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4 text-6xl">🛒</div>
        <p className="text-gray-500 text-lg">No orders found</p>
        <p className="text-gray-400 text-sm mt-2">
          Your orders will appear here once placed
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-8 text-gray-800 border-b pb-4">
        Order History
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 tracking-wide">
                  ORDER NUMBER
                </p>
                <p className="text-sm font-mono text-gray-700">{order._id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 tracking-wide">
                  ORDER DATE
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt || "").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 tracking-wide">
                  TOTAL AMOUNT
                </p>
                <p className="text-base font-semibold text-gray-800">
                  ${order.totalPrice}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 tracking-wide">
                  PAYMENT STATUS
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeStyle(
                    order?.status
                  )}`}
                >
                  {order?.status}
                </span>
              </div>
            </div>

            {order.deliveryAddress && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Delivery Information
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Name:</span>{" "}
                    {order.deliveryAddress.fullName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span>{" "}
                    {order.deliveryAddress.phone}
                  </p>
                  <p className="col-span-2 text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {order.deliveryAddress.address}
                  </p>
                </div>
              </div>
            )}

            {order.products?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center text-sm bg-white p-3 rounded-lg shadow-xs"
                    >
                      <div>
                        <span className="font-medium text-gray-800">
                          {item.product.name}
                        </span>
                        <span className="text-gray-500 ml-2">
                          ×{item.quantity}
                        </span>
                      </div>
                      <span className="text-gray-700 font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {meta?.totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing page {currentPage} of {meta.totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={isLoading || currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={isLoading || currentPage === meta.totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
