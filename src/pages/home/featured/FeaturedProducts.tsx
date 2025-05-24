import { Link } from "react-router-dom";
import { TProduct } from "../../../types/product.type";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";
import { CardSkeleton } from "../../../components/ui/Skeleton";
import ProductCard from "../../../components/ui/ProductCard";

const FeaturedProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  return (
    <div className="container max-w-6xl mx-auto md:px-0 px-5 py-8">
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
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </div>
      ) : (
        <>
          {/* Product Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {Array.isArray(products?.data) &&
              products?.data
                .slice(0, 4)
                .map((product: TProduct) => (
                  <ProductCard key={product._id} product={product} />
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
        </>
      )}
    </div>
  );
};

export default FeaturedProductsPage;
