import { useState } from "react";
import { useGetAllFProductsQuery } from "../../../../redux/features/products/products.api";
import { Pencil, Trash2 } from "lucide-react"; // Importing Lucide icons

const AdminDashboardAllProducts = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // Number of products per page

  const { data: response, isLoading } = useGetAllFProductsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  const products = response?.data || [];
  const totalPages = response?.meta?.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Products</h1>
        <p className="text-gray-600">Manage your products efficiently</p>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Brand
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Price (BDT)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    {/* Product Image */}
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>

                    {/* Product Name */}
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {product.name}
                    </td>

                    {/* Brand */}
                    <td className="px-4 py-3 text-gray-700">{product.brand}</td>

                    {/* Category */}
                    <td className="px-4 py-3 text-gray-700">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-gray-900">
                      {product.price.toFixed(2)} BDT
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-3 text-gray-900">
                      {product.quantity}
                    </td>

                    {/* Stock Status */}
                    <td className="px-4 py-3">
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

                    {/* Actions - Edit & Delete */}
                    <td className="px-4 py-3 flex space-x-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-100 rounded">
                        <Pencil size={18} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-100 rounded">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>

            <p className="text-gray-700">
              Page {page} of {totalPages}
            </p>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardAllProducts;
