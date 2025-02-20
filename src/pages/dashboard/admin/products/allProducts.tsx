import { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/products/products.api";
import { toast } from "sonner";
import Loading from "../../../../components/ui/Loading";
import { TProduct } from "../../../../types/product.type";
import { Pencil, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";

const AdminDashboardAllProducts = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const { register, handleSubmit, reset } = useForm<TProduct>();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deletingProduct, setDeletingProduct] = useState<TProduct | null>(null);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllProductsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  const [deleteProduct] = useDeleteProductMutation();

  const products = response?.data || [];
  const totalPages = response?.meta?.totalPages || 1;

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;

    try {
      await deleteProduct(deletingProduct._id).unwrap();
      toast.success("Product deleted successfully!");

      // Adjust page if last item on current page is deleted
      if (products.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }
    } catch (error) {
      toast.error("Failed to delete product!");
    } finally {
      setDeletingProduct(null);
    }
  };

  const BIKE_CATEGORIES = ["Mountain", "Road", "Hybrid", "Electric"] as const;
  // Reset form when editing product changes
  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    }
  }, [editingProduct, reset]);

  const handleUpdate = async (data: TProduct) => {
    if (!editingProduct) return;

    try {
      await updateProduct({
        id: editingProduct._id,
        data: {
          ...data,
          price: Number(data.price),
          quantity: Number(data.quantity),
        },
      }).unwrap();
      toast.success("Product updated successfully");
      setEditingProduct(null);
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-center py-8">Error loading products</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          All Products
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage your products efficiently
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="hidden md:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Brand
              </th>
              <th className="hidden sm:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="hidden sm:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product: TProduct) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-3 py-3 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 object-cover rounded"
                  />
                </td>
                <td className="px-3 py-3 font-medium text-gray-900 max-w-[150px] truncate">
                  {product.name}
                </td>
                <td className="hidden md:table-cell px-3 py-3 text-gray-700">
                  {product.brand}
                </td>
                <td className="hidden sm:table-cell px-3 py-3 text-gray-700">
                  {product.category}
                </td>
                <td className="px-3 py-3 text-gray-900">
                  ৳{product.price.toFixed(2)}
                </td>
                <td className="hidden sm:table-cell px-3 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-3 py-3 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeletingProduct(product)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    {...register("brand", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    {...register("category", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {BIKE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    {...register("quantity", { required: true })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("inStock")}
                    className="h-4 w-4"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    In Stock
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full px-3 py-2 border rounded-md h-24"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deletingProduct.name}</span>?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
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

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default AdminDashboardAllProducts;
