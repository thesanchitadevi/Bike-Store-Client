import { IconButton } from "@mui/material";
import {
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
  selectTotalPrice,
} from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-100 pt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in uppercase">
          Cart Items
        </h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-xl font-medium py-8">
            Your cart is currently empty.
          </h3>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* Cart Items Column */}
          <div className="col-span-2">
            {cartItems.map((item) => (
              <div className="rounded-lg mb-6" key={item.product}>
                <div className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={item.image}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-gray-700">
                        {item.price} BDT
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <div className="flex items-start gap-2">
                          <IconButton
                            onClick={() =>
                              dispatch(decreaseQuantity(item.product))
                            }
                            size="small"
                          >
                            <Minus fontSize="small" />
                          </IconButton>
                          <h2 className="mt-1 text-lg">{item.quantity}</h2>
                          <IconButton
                            onClick={() =>
                              dispatch(increaseQuantity(item.product))
                            }
                            size="small"
                          >
                            <Plus fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal:</p>
                        <p className="text-gray-700">
                          {`${(item.price * item.quantity).toFixed(2)}`} BDT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Bar Column */}
          <div className="col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {totalPrice.toFixed(2)} BDT
                  </p>
                </div>
              </div>
              <Link to="/orders">
                <button className="bg-[#BD2A2E] text-white py-4 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase w-full mt-4">
                  Check out
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
