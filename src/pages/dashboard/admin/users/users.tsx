import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/features/admin/admin.api";
import { TUser } from "../../../../redux/features/auth/authSlice";

const AdminDashboardUsers = () => {
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery([]);
  const [updateUser] = useBlockUserMutation();

  const handleBlockUser = async (
    userId: string,
    isCurrentlyBlocked: boolean
  ) => {
    try {
      await updateUser({
        userId,
        updates: { isBlocked: !isCurrentlyBlocked },
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">Error loading users!</div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.map((user: TUser) => (
              <tr key={user.userId}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isBlocked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.isBlocked ? "Deactive" : "Active"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      handleBlockUser(
                        user._id as string,
                        user.isBlocked as boolean
                      )
                    }
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      user.isBlocked
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {user.isBlocked ? "Reactivate" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.data?.length === 0 && (
          <div className="text-center py-4 text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
