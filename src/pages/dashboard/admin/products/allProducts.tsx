/* eslint-disable @typescript-eslint/no-unused-vars */
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

const BIKE_CATEGORIES = ["Mountain", "Road", "Hybrid", "Electric"] as const;

const AdminDashboardAllProducts = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const { register, handleSubmit, reset } = useForm<TProduct>();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deletingProduct, setDeletingProduct] = useState<TProduct | null>(null);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    brand: "",
    inStock: "",
  });

  // Build query parameters more carefully
  const buildQueryParams = () => {
    // Explicitly type value as string | number | boolean
    const params: { name: string; value: string | number | boolean }[] = [
      { name: "page", value: Number(page) },
      { name: "limit", value: Number(limit) },
    ];

    // Only add filters if they have values
    if (filters.name.trim()) {
      params.push({ name: "name", value: filters.name.trim() });
    }
    if (filters.category) {
      params.push({ name: "category", value: filters.category });
    }
    if (filters.brand.trim()) {
      params.push({ name: "brand", value: filters.brand.trim() });
    }
    if (filters.inStock !== "") {
      params.push({ name: "inStock", value: filters.inStock === "true" });
    }

    return params;
  };

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery(buildQueryParams());

  const [deleteProduct] = useDeleteProductMutation();

  const products: TProduct[] = Array.isArray(response?.data)
    ? response.data
    : [];
  const totalPages = response?.meta?.totalPage || 1;

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;

    try {
      await deleteProduct(deletingProduct._id).unwrap();
      toast.success("Product deleted successfully!");

      // Adjust page if last item on current page is deleted
      if (Array.isArray(products) && products.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }
    } catch (error) {
      toast.error("Failed to delete product!");
    } finally {
      setDeletingProduct(null);
    }
  };

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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Filter changed: ${name} = ${value}`);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset to page 1 when filters change
    setPage(1);
  };

  const resetFilters = () => {
    console.log("Resetting filters");
    setFilters({
      name: "",
      category: "",
      brand: "",
      inStock: "",
    });
    setPage(1);
  };

  if (isLoading) return <Loading />;

  if (isError) {
    console.error("Error loading products:", error);
    return (
      <div className="text-center py-8">
        <div className="text-red-600">Error loading products</div>
        <div className="text-sm text-gray-500 mt-2">
          {error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Unknown error occurred"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          All Products
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage your products efficiently
        </p>
      </div>

      {/* filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Filter Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Search by name"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Categories</option>
              {BIKE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              placeholder="Search by brand"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Status
            </label>
            <select
              name="inStock"
              value={filters.inStock}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Show message if no products found */}
      {products.length === 0 && !isLoading && (
        <div className="text-center py-8 mb-6">
          <div className="text-gray-500 text-lg mb-2">No products found</div>
          <div className="text-sm text-gray-400">
            {Object.values(filters).some((value) => value !== "")
              ? "Try adjusting your filters to see more results"
              : "No products available in the database"}
          </div>
        </div>
      )}

      {/* Table - Only show if there are products */}
      {products.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
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
      )}

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
            <h3 className="text-lg font-semibull mb-4">Confirm Delete</h3>
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

      {/* Pagination - Only show if there are products */}
      {products.length > 0 && (
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
      )}
    </div>
  );
};

export default AdminDashboardAllProducts;
