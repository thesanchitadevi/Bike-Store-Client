/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../../redux/features/order/order.api";
import Loading from "../../../../components/ui/Loading";
import { IOrderResponse } from "../../../../types/order.type";
import { Pencil, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
] as const;

const AdminDashboardAllOrders = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [editingOrder, setEditingOrder] = useState<IOrderResponse | null>(null);
  const { register, handleSubmit, reset } = useForm<{ status: string }>();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deletingOrder, setDeletingOrder] = useState<IOrderResponse | null>(
    null
  );
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useAllOrdersQuery({
    page,
    limit,
  });
  console.log(response);

  const orders = response?.data || [];
  const totalPages = response?.meta?.totalPage || 1;

  // Reset form when editing order changes
  useEffect(() => {
    if (editingOrder) {
      reset({ status: editingOrder.orderStatus });
    }
  }, [editingOrder, reset]);

  // Status update handler
  const handleStatusUpdate = async ({ status }: { status: string }) => {
    if (!editingOrder) return;

    try {
      const result = await updateOrderStatus({
        id: editingOrder._id,
        orderStatus: status,
      }).unwrap();

      // Verify the returned data structure
      console.log("Updated order:", result);

      toast.success("Order status updated successfully");
      setEditingOrder(null);
      refetch(); // Force refresh the data
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  // Delete order handler
  const handleConfirmDelete = async () => {
    if (!deletingOrder) return;

    try {
      const result = await deleteOrder(deletingOrder._id).unwrap();
      if (result.success) {
        toast.success("Order deleted successfully!");

        // Refetch data
        refetch();

        // Page adjustment logic
        if (orders.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        }
      }
    } catch (error) {
      toast.error("Failed to delete order!");
    } finally {
      setDeletingOrder(null);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-center py-8">Error loading orders</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          All Orders
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage customer orders efficiently
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Transaction ID
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="hidden md:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Delivery Address
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Products
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Price
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order: IOrderResponse) => (
              <tr key={order._id} className="hover:bg-gray-50">
                {/* Order ID */}
                <td className="px-3 py-3 text-sm text-gray-900 font-mono">
                  #{order._id}
                </td>

                {/* Customer Info */}
                <td className="px-3 py-3 text-sm text-gray-900">
                  {order.user.email}
                </td>

                {/* Delivery Address */}
                <td className="hidden md:table-cell px-3 py-3 text-sm text-gray-700">
                  {order.deliveryAddress ? (
                    <>
                      <div>{order.deliveryAddress.fullName}</div>
                      <div>{order.deliveryAddress.phone}</div>
                      <div className="truncate max-w-[200px]">
                        {order.deliveryAddress.address}
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>

                {/* Products */}
                <td className="px-3 py-3 text-sm text-gray-900">
                  <div className="space-y-1">
                    {order.products.map((product) => (
                      <div key={product.product?._id} className="flex gap-2">
                        <span className="font-medium truncate max-w-[120px]">
                          {product?.product?.name}
                        </span>
                        <span>(x{product.quantity})</span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Total Price */}
                <td className="px-3 py-3 text-sm font-semibold text-gray-900">
                  ৳{order.totalPrice.toFixed(2)}
                </td>

                {/* Payment status */}
                <td className="px-3 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Order Status */}
                <td className="px-3 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.orderStatus === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-purple-100 text-purple-700"
                        : order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : null // cancelled
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/*  Actions */}
                <td className="px-3 py-3 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => setEditingOrder(order)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeletingOrder(order)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    {isDeleting ? "Deleting..." : <Trash2 size={18} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Update Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setEditingOrder(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Update Order Status</h3>

            <form
              onSubmit={handleSubmit(handleStatusUpdate)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Status
                </label>
                <select
                  {...register("status", { required: true })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setDeletingOrder(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Confirm Order Deletion
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete order #
              {deletingOrder.transaction.id}?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeletingOrder(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination - Same as products */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 text-sm rounded-md ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 text-sm rounded-md ${
              page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      )}
    </div>
  );
};

export default AdminDashboardAllOrders;
