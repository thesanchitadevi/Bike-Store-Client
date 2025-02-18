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

  // Sync current page with API response
  useEffect(() => {
    if (meta.page !== undefined && meta.page !== currentPage) {
      setCurrentPage(meta.page);
    }
  }, [meta.page]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-8 text-gray-500">No orders found.</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Order ID</p>
                <p className="text-gray-800">{order._id}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Order Date
                </p>
                <p className="text-gray-800">
                  {new Date(order.createdAt || "").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Amount
                </p>
                <p className="text-lg font-bold text-blue-600">
                  ${order.totalPrice}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Status</p>
                <p className="capitalize text-gray-800">{order?.orderStatus}</p>
              </div>
            </div>

            {order.deliveryAddress && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2 text-gray-700">
                  Delivery Address
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Name:</span>{" "}
                    {order.deliveryAddress.fullName}
                  </p>
                  <p>
                    <span className="text-gray-600">Phone:</span>{" "}
                    {order.deliveryAddress.phone}
                  </p>
                  <p className="col-span-2">
                    <span className="text-gray-600">Address:</span>{" "}
                    {order.deliveryAddress.address}
                  </p>
                </div>
              </div>
            )}

            {order.products?.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2 text-gray-700">Products</h3>
                <div className="space-y-2">
                  {order.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center text-sm"
                    >
                      <div>
                        <span className="text-gray-800 font-medium">
                          {item.product.name}
                        </span>
                        <span className="text-gray-500 mx-2">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {meta.totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={isLoading || currentPage === 1}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {meta.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={isLoading || currentPage === meta.totalPages}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
