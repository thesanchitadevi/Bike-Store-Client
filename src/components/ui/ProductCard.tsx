import { Link } from "react-router-dom";

import { Key } from "react";

interface ProductCardProps {
  product: {
    _id: Key | null | undefined;

    image: string;
    brand: string;
    model: string;
    category: string;
    quantity: number;
    createdAt: string | number | Date;
    name: string;
    description: string;
    price: number;
    inStock: boolean;
  };
  showRating?: boolean;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
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
          {new Date(product.createdAt) >=
            new Date(new Date().setDate(new Date().getDate() - 3)) && (
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
  );
};

export default ProductCard;
