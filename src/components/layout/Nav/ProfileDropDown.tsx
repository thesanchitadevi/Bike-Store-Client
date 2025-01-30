import { useState } from "react";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const ProfileDropDown = () => {
  const user = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State to manage the navbar's visibility
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    setShowProfileDropdown(false); // Hide dropdown
    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      <div className="absolute right-10 top-16 bg-white w-48 shadow-md rounded-md z-10">
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
          className="w-full py-2 text-sm hover:bg-gray-800 bg-[#BD2A2E] text-white flex justify-center cursor-pointer"
        >
          Logout
        </button>
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
