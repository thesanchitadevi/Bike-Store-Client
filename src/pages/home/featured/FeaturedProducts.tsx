import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { TProduct } from "../../../types/product.type";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";

const FeaturedProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {Array.isArray(products?.data) &&
          products?.data.slice(0, 4).map((product: TProduct) => (
            <>
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white rounded-sm overflow-hidden shadow-lg ring-2 ring-gray-200 ring-opacity-20 transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover object-center"
                    src={product.image}
                    alt="Product Image"
                  />
                  {
                    // Sale Badge
                    product.quantity < 5 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                        SALE
                      </div>
                    )
                  }
                  {/* New badge */}
                  {new Date(product.createdAt) >=
                    new Date(new Date().setDate(new Date().getDate() - 3)) && (
                    <div className="absolute top-0 left-0 bg-[#BD2A2E] text-gray-200 font-sm px-2.5 py-1 m-2 text-xs ">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  {/* Rating */}
                  <div className="my-3 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(4)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({4} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-medium">
                      {product.price} BDT
                    </span>
                    {
                      // Out of Stock Badge
                      product.quantity === 0 ? (
                        <span className="text-[#BD2A2E] px-2 py-1 text-sm font-semibold">
                          OUT OF STOCK
                        </span>
                      ) : (
                        <span className="text-green-800 px-2 py-1 rounded-md text-sm font-semibold">
                          IN STOCK
                        </span>
                      )
                    }
                  </div>
                  <div>
                    <button className=" bg-transparent text-gray-600 hover:text-[#BD2A2E] font-bold py-4 px-4 rounded w-full mt-4 cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            </>
          ))}
      </div>

      {/* All Products Button */}
      <div className="text-center mt-12">
        <Link to="/products">
          <button className="bg-[#BD2A2E] text-white py-4 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProductsPage;
