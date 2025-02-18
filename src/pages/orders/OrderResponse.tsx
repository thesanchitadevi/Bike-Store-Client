import { useVerifyOrderQuery } from "../../redux/features/order/order.api";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from "../Skeleton/Skeleton";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function OrderResponse() {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useVerifyOrderQuery(searchParams.get("order_id"));

  const orderData: OrderData = data?.data?.[0];

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      {/* Order Details Card */}
      <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-md p-6">
        <div className="border-b border-gray-200 pb-3 mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="font-medium">Order ID:</div>
          <div>{orderData?.order_id}</div>

          <div className="font-medium">Amount:</div>
          <div>
            {orderData?.currency} {orderData?.amount.toFixed(2)}
          </div>

          <div className="font-medium">Status:</div>
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                orderData?.bank_status === "Success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {orderData?.bank_status}
            </span>
          </div>

          <div className="font-medium">Date:</div>
          <div>{new Date(orderData?.date_time).toLocaleString()}</div>
        </div>
        <Link to="/user/dashboard/myOrders">
          <button className="bg-[#BD2A2E] text-white py-2 px-4 mt-10 w-full font-semibold hover:bg-gray-800 cursor-pointer uppercase">
            View Orders
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
        {/* Payment Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h2 className="text-xl font-semibold">Payment Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="font-medium">Method:</div>
            <div>{orderData?.method}</div>

            <div className="font-medium">Transaction ID:</div>
            <div>{orderData?.bank_trx_id}</div>

            <div className="font-medium">Invoice No:</div>
            <div>{orderData?.invoice_no}</div>

            <div className="font-medium">SP Code:</div>
            <div>{orderData?.sp_code}</div>

            <div className="font-medium">SP Message:</div>
            <div>{orderData?.sp_message}</div>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h2 className="text-xl font-semibold">Customer Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="font-medium">Name:</div>
            <div>{orderData?.name}</div>

            <div className="font-medium">Email:</div>
            <div>{orderData?.email}</div>

            <div className="font-medium">Phone:</div>
            <div>{orderData?.phone_no}</div>

            <div className="font-medium">Address:</div>
            <div>{orderData?.address}</div>

            <div className="font-medium">City:</div>
            <div>{orderData?.city}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
