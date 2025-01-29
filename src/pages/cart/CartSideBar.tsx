// src/components/CartSidebar.js
import { Drawer, List, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
} from "../../redux/features/cart/cartSlice";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose(); // Close the sidebar
    navigate("/products"); // Navigate to the home or products page
  };

  const handleCheckout = () => {
    onClose(); // Close the sidebar
    navigate("/checkout"); // Navigate to the checkout page
  };

  const handleVisitCart = () => {
    onClose(); // Close the sidebar
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="w-80 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#BD2A2E] font-bold text-xl">Your Cart</h3>
          <IconButton onClick={onClose}>
            <X />
          </IconButton>
        </div>
        {cartItems.length === 0 ? (
          // Display when cart is empty
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-medium py-8">
              Your cart is currently empty.
            </h3>
            <button
              className="bg-[#BD2A2E] text-white py-4 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Display when cart has items
          <>
            <List>
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center gap-2 w-full py-5"
                >
                  <img
                    src={item.image} // Display product image
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex flex-col items-center gap-2 w-full">
                    <h3>{item.name}</h3>

                    <div className="flex items-start  gap-2">
                      <IconButton
                        onClick={() => dispatch(decreaseQuantity(item.product))}
                        size="small"
                      >
                        <Minus fontSize="small" />
                      </IconButton>
                      <h2 className="mt-1 text-lg">{item.quantity}</h2>
                      <IconButton
                        onClick={() => dispatch(increaseQuantity(item.product))}
                        size="small"
                      >
                        <Plus fontSize="small" />
                      </IconButton>
                    </div>
                    <div>
                      <h3>{item.price} BDT</h3>
                    </div>
                    <h3>
                      Subtotal:
                      <span>
                        {" "}
                        {`${(item.price * item.quantity).toFixed(2)}`} BDT
                      </span>
                    </h3>
                  </div>
                  <IconButton
                    onClick={() => dispatch(removeFromCart(item.product))}
                    size="small"
                  >
                    <X />
                  </IconButton>
                </div>
              ))}
            </List>

            <div className="flex justify-between my-4">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {totalPrice.toFixed(2)} BDT
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col space-y-2">
              <button
                className="bg-[#BD2A2E] text-white py-4 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="bg-[#BD2A2E] text-white py-4 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase"
                onClick={handleVisitCart}
              >
                View Cart
              </button>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default CartSidebar;
