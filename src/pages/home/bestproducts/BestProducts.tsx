import { Link } from "react-router-dom";
import { TProduct } from "../../../types/product.type";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";
import { CardSkeleton } from "../../../components/ui/Skeleton";

const BestProducts = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  const bestSellingProducts = Array.isArray(products?.data)
    ? products.data.filter((product) => product.quantity < 150)
    : [];

  if (isLoading) {
    return (
      <div>
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in uppercase">
          Best Products
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {bestSellingProducts?.slice(0, 6).map((product: TProduct) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-101"
          >
            <div className="relative">
              <img
                className="w-full h-44 object-cover object-center"
                src={product.image}
                alt={product.name}
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {/* Best Selling Badge - Always shown for filtered products */}
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-medium">
                  BEST SELL
                </span>

                {/* Sale Badge - Only for very low stock */}
                {product.quantity < 5 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                    SALE
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              {/* Product Meta Info */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    {product.brand || "Brand"}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm font-medium text-gray-500">
                    {product.category || "Category"}
                  </span>
                </div>
                {product.model && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {product.model}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h3 className="text-lg font-semibold mb-3 line-clamp-1">
                {product.name}
              </h3>

              {/* Price and Stock */}
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg text-[#BD2A2E]">
                  {product.price} BDT
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    product.quantity === 0
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {product.quantity === 0 ? "OUT OF STOCK" : "IN STOCK"}
                </span>
              </div>

              {/* View Details Button */}
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-300">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
