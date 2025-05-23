import { Link } from "react-router-dom";

import { TProduct } from "../../../types/product.type";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";

const FeaturedProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container max-w-6xl mx-auto md:px-0 px-5 py-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in uppercase">
          Featured Products
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We offer top-notch solutions for all your biking needs. From repairs
          and customizations to rentals, we have everything you need to keep you
          riding smoothly
        </p>
      </div>
      {/* Product Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {Array.isArray(products?.data) &&
          products?.data.slice(0, 4).map((product: TProduct) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative">
                  <img
                    className="w-full h-56 object-cover object-center"
                    src={product.image}
                    alt={product.name}
                  />
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {new Date(product.createdAt) >=
                      new Date(
                        new Date().setDate(new Date().getDate() - 3)
                      ) && (
                      <span className="bg-[#BD2A2E] text-white text-xs px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                    {product.quantity < 5 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
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
                        {product.brand}
                      </span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm font-medium text-gray-500">
                        {product.category}
                      </span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {product.model}
                    </span>
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
            </div>
          ))}
      </div>

      {/* All Products Button */}
      <div className="text-center mt-12">
        <Link to="/products">
          <button className="bg-[#BD2A2E] text-white py-3 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase transition-colors duration-300 rounded">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProductsPage;
