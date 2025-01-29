import { Link } from "react-router-dom";
import { useGetAllFProductsQuery } from "../../redux/features/products/products.api";
import { Star } from "lucide-react";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetAllFProductsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in uppercase">
          Products
        </h1>
      </div>
      {/* Product Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {products?.data?.map((product) => (
          <>
            <div
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
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                {/* Rating */}
                <div className="my-3 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(4) ? "text-yellow-400" : "text-gray-300"
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
                <Link to={`/product/${product._id}`}>
                  <button className=" bg-transparent text-gray-600 hover:text-[#BD2A2E] font-bold py-4 px-4 rounded w-full mt-4 cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
