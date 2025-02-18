import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleproductQuery } from "../../redux/features/products/products.api";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const tags = ["Bike", "Mountain Bikes", "Road Bikes", "Hybrid Bikes"];

const ProductsDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleproductQuery(id as string);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // Check if the user is logged in
  const user = useAppSelector(selectCurrentUser);

  // Increase quantity
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity (minimum 1)
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return <p className="text-center py-4">Error fetching product details.</p>;
  if (!data || !data.data)
    return <p className="text-center py-4">Product not found.</p>;

  const product = data.data;

  const handleAddToCart = () => {
    if (!user) {
      // If the user is not logged in, show a toast and redirect to the login page
      toast.error("You need to log in to add products to your cart.");
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        product: product._id, // Use the product's unique ID
        name: product.name,
        price: product.price,
        quantity, // Pass the selected quantity
        image: product.image,
      })
    );
  };

  return (
    <div className="py-15">
      <div className="max-w-6xl mx-auto px-4 px-6 md:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="md:h-[460px] rounded-lg bg-gray-300 mb-4">
              <img
                src={product.image}
                className="w-full h-full object-cover"
                alt={product.name}
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>

            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.price} BDT
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:{" "}
                </span>
                {product.inStock ? (
                  <span className="text-green-500 dark:text-green-300">
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-500 dark:text-red-300">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
            </div>
            <div className="md:flex md:-mx-2 my-15 ">
              {/* Quantity Button */}
              <div>
                <div className="flex items-center outline outline-gray-300">
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={handleIncrease}
                    type="button"
                  >
                    <Plus />
                  </button>
                  <input
                    type="number"
                    className="outline-none text-center md:w-16 py-4 bg-transparent"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={handleDecrease}
                    type="button"
                  >
                    <Minus />
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 md:px-2 mt-4 md:mt-0">
                <button
                  className="flex justify-center gap-2 w-full bg-[#BD2A2E] text-white py-4 px-4 font-semibold hover:bg-gray-800 cursor-pointer uppercase"
                  type="button"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
            <div>
              {/* Category */}
              <div className="flex items-center mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">
                  Category:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.category}
                </span>
              </div>
              {/* Brand */}
              <div className="flex items-center mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">
                  Brand:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.brand}
                </span>
              </div>
              {/* Tags */}
              <div className="flex md:items-center mb-4">
                <span className="font-bold text-gray-700  mr-2">Tags: </span>
                <span className="text-gray-600">
                  {tags.map((tag, index) => (
                    <span key={index} className="mr-2">
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
