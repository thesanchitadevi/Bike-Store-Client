/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import {
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useChangePasswordMutation,
  useGetMeQuery,
} from "../../redux/features/auth/authApi";
import Loading from "./Loading";

const MyProfile = () => {
  const data = useGetMeQuery([]);
  const userData = data?.data;
  const user = userData?.data;

  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordData.newPassword.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try {
      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      setSuccess("Password changed successfully!");
      // Step 3: Update toast to redirect after dismissal
      toast.success("Password changed successfully! Please log in again.", {
        onAutoClose: () => navigate("/login"),
      });
      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
      setIsEditingPassword(false);
    } catch (err: any) {
      setError(
        err.data?.message || "Failed to change password. Please try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gray-50 rounded-lg shadow-md p-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <UserCircleIcon className="h-16 w-16 text-gray-400" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5" />
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Contact Information
              </h2>

              <div className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="text-gray-900">{user?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-gray-600">Address</p>
                  <p className="text-gray-900">
                    {user?.address}, {user?.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Account Details
              </h2>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Account Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user?.sBlocked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-gray-900">
                    {new Date(user?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Security Tip: Always keep your account information private and
                  update your password regularly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="mt-8 border-t pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <LockIcon className="h-6 w-6 text-purple-500" />
            Password & Security
          </h2>
          {!isEditingPassword && (
            <button
              onClick={() => setIsEditingPassword(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Change Password
            </button>
          )}
        </div>

        {isEditingPassword && (
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.old ? "text" : "password"}
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        old: !showPassword.old,
                      })
                    }
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.old ? (
                      <EyeClosedIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        new: !showPassword.new,
                      })
                    }
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.new ? (
                      <EyeClosedIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            {/* Update button section */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditingPassword(false);
                  setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                  });
                  setError("");
                  setSuccess("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
