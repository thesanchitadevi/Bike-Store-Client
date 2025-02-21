import { useGetAllUsersQuery } from "../../../redux/features/admin/admin.api";
import { useAllOrdersQuery } from "../../../redux/features/order/order.api";
import { useGetAllProductsQuery } from "../../../redux/features/products/products.api";

const AdminDashboard = () => {
  const { data: orders } = useAllOrdersQuery([]);
  const { data: products } = useGetAllProductsQuery([]);
  const { data: users } = useGetAllUsersQuery([]);
  console.log(orders?.data);
  console.log(products?.data);
  console.log(users?.data);

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Manage your account and activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Total Products</h3>
            <p className="text-2xl font-bold text-gray-800">
              {products?.data?.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800">
              {orders?.data?.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800">
              {users?.data?.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Pending Orders</h3>
            <p className="text-2xl font-bold text-gray-800">
              {
                orders?.data?.filter((order) => order.orderStatus === "Pending")
                  .length
              }
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Pending Payments</h3>
            <p className="text-2xl font-bold text-gray-800">
              {
                orders?.data?.filter((order) => order.status === "Pending")
                  .length
              }
            </p>
          </div>
        </div>

        {/* Recent Activity */}
      </div>
    </div>
  );
};

export default AdminDashboard;
