/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  clearCart,
  selectCartItems,
  selectTotalPrice,
} from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/features/order/order.api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import Loading from "../../components/ui/Loading";
import { HomeIcon, MailIcon, UserIcon } from "lucide-react";

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
      products: cartItems.map((item: any) => ({
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

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="grid py-15 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {
              // Display cart items
              cartItems.map((item: any) => (
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

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="https://shurjopay.com.bd/dev/images/shurjoPay.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">ShurjoPay</span>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">User Details</p>
          <p className="text-gray-400">
            Complete your order by providing your details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your name"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your address"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <HomeIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <div className="space-y-6">
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Shipping
                    </p>
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
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="bg-[#BD2A2E] text-white py-4 px-8 font-semibold hover:bg-gray-800 cursor-pointer uppercase w-full my-4"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
