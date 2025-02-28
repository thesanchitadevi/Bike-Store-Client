import { useState } from "react";
import { logout } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "sonner";

const ProfileDropDown = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State to manage the navbar's visibility
  const [, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    toast.success("Logged out successfully!");
    setShowProfileDropdown(false); // Hide dropdown
    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      <div className="absolute right-10 top-16 bg-white w-48 shadow-md rounded-md z-10">
        <div className="p-4">
          <button
            onClick={() => navigate("/user/dashboard")} // Navigate to profile page
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Dashboard
          </button>
          <hr className="my-2" />

          <button
            onClick={handleLogout} // Navigate to orders page
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;

/* 
<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg">
                <div className="p-4">
                  <p className="text-xs text-gray-600"> {user?.name}</p>
                  <p className="text-xs text-gray-600"> {user?.email}</p>

                  <button
                    onClick={() => navigate("/profile")} // Navigate to profile page
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <hr className="my-2" />

                  <button
                    onClick={() => navigate("/orders")} // Navigate to orders page
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 bg-[#BD2A2E] text-white flex justify-center"
                >
                  Logout
                </button>
              </div>
*/
