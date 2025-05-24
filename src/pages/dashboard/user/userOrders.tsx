import { useState, useEffect } from "react";
import { useMyOrdersQuery } from "../../../redux/features/order/order.api";
import { Clock, Package, CheckCircle, Truck, XCircle } from "lucide-react";
import Loading from "../../../components/ui/Loading";

const UserOrders = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: ordersResponse, isLoading } = useMyOrdersQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  const orders = ordersResponse?.data || [];
  const totalPages = ordersResponse?.meta?.totalPage || 1;

  useEffect(() => {
    if (Array.isArray(orders) && orders.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [orders, page]);

  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <Clock className="w-4 h-4" />,
        };
      case "shipped":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Truck className="w-4 h-4" />,
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800",
          icon: <XCircle className="w-4 h-4" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Package className="w-4 h-4" />,
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-blue-50 p-6 rounded-full mb-4">
          <Package className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Orders Yet
        </h3>
        <p className="text-gray-500 max-w-md mb-6">
          You haven't placed any orders yet. Start shopping to see your orders
          here.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">
            View and manage all your recent purchases
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const statusDetails = getStatusDetails(order.status);
            return (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Placed on{" "}
                        {new Date(order.createdAt ?? "").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusDetails.color}`}
                      >
                        {statusDetails.icon}
                        <span className="ml-1.5">{order.status}</span>
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ৳{order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Products
                    </h4>
                    <div className="space-y-3">
                      {order.products?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                              {item.product?.image && (
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.product?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              ৳
                              {(item.product?.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.deliveryAddress && (
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Delivery Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">Name:</span>{" "}
                            {order.deliveryAddress.fullName}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Phone:</span>{" "}
                            {order.deliveryAddress.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">Address:</span>{" "}
                            {order.deliveryAddress.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Showing page {page} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 text-sm rounded-lg border ${
                page === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-blue-500 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 text-sm rounded-lg border ${
                page === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-blue-500 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
