/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../../../redux/features/products/products.api";
import { useCreateOrderMutation } from "../../../../redux/features/order/order.api";
import { toast } from "sonner";

const AdminDashboardOrderAdd = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetAllProductsQuery(undefined);
  const [createOrder] = useCreateOrderMutation();

  const [selectedProducts, setSelectedProducts] = useState<
    Array<{ _id: string; name: string; price: number }>
  >([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Toast notification
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const filteredProducts =
    products?.data?.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleQuantity = (productId: string, operation: "inc" | "dec") => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(
        1,
        prev[productId] + (operation === "inc" ? 1 : -1)
      ),
    }));
  };

  const calculateTotal = () =>
    selectedProducts.reduce(
      (total, product) =>
        total + product.price * (quantities[product._id] || 1),
      0
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({
        products: selectedProducts.map((product) => ({
          product: product._id,
          quantity: quantities[product._id] || 1,
        })),
        totalPrice: calculateTotal(),
      }).unwrap();

      toast.success("Order created successfully!");

      setSelectedProducts([]);
      setQuantities({});
      setShowSuccess(true);
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  if (isLoading)
    return <div className="p-4 text-center">Loading products...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error loading products</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Order create by admin */}

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Order</h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Product Search and Selection */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 max-h-96 overflow-y-auto p-2">
            {filteredProducts.map((product: any) => (
              <div
                key={product._id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedProducts.some((p) => p._id === product._id)
                    ? "bg-blue-50 border-blue-400"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  if (!selectedProducts.some((p) => p._id === product._id)) {
                    setSelectedProducts((prev) => [...prev, product]);
                    setQuantities((prev) => ({ ...prev, [product._id]: 1 }));
                  }
                }}
              >
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <div className="md:flex items-center justify-between mt-2">
                  <p className="text-gray-600">৳{product.price.toFixed(2)}</p>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full  ${
                      product.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Products */}
        {selectedProducts.length > 0 && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Selected Products
            </h2>

            <div className="space-y-4">
              {selectedProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Unit price: ৳{product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => handleQuantity(product._id, "dec")}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantities[product._id] || 1}
                        onChange={(e) =>
                          setQuantities((prev) => ({
                            ...prev,
                            [product._id]: Math.max(
                              1,
                              parseInt(e.target.value)
                            ),
                          }))
                        }
                        className="w-12 text-center border-0 focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantity(product._id, "inc")}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="w-24 text-right">
                      <p className="font-medium text-blue-600">
                        ৳
                        {(
                          product.price * (quantities[product._id] || 1)
                        ).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedProducts((prev) =>
                          prev.filter((p) => p._id !== product._id)
                        )
                      }
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Submit */}
            <div className="mt-8 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold text-gray-800">
                    Total: ৳{calculateTotal().toFixed(2)}
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animation for toast */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboardOrderAdd;
