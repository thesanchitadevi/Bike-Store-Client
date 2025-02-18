import { useEffect } from "react";
import {
  clearCart,
  selectCartItems,
  selectTotalPrice,
} from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/features/order/order.spi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const toastId = "order";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      // toast.success(data?.message, { id: toastId });
      dispatch(clearCart());
      if (data?.data) {
        // console.log(data?.data);

        // dispatch(afterOrder())
        setTimeout(() => {
          window.location.href = data?.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [
    isLoading,
    isSuccess,
    isError,
    error,
    data?.data,
    data?.message,
    dispatch,
  ]);

  const handlePlaceOrder = async () => {
    const orderData = {
      products: cartItems.map((item) => ({
        product: item.product, // Ensure this matches your product ID field
        quantity: item.quantity,
      })),
      // Add totalPrice if your API requires it
      totalPrice: totalPrice,
    };

    // Send the formatted order data
    const result = await createOrder(orderData).unwrap();

    // Handle success (clear cart, show notification, etc.)
    console.log("Order created successfully:", result);
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items and palce your order</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {
              // Display cart items
              cartItems.map((item) => (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.image}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.name}</span>
                    <span className="float-right text-gray-400">
                      Total Quantity: {item.quantity}
                    </span>
                    <h3 className="mt-auto text-medium font-bold">
                      Subtotal:
                      <span>
                        {" "}
                        {`${(item.price * item.quantity).toFixed(2)}`} BDT
                      </span>
                    </h3>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <div className="space-y-6">
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">0.00 BDT</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xl font-medium text-gray-900">Total</p>
                <p className="text-xl font-semibold text-gray-900">
                  {" "}
                  {totalPrice.toFixed(2)} BDT
                </p>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-[#BD2A2E] text-white py-4 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase w-full my-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
