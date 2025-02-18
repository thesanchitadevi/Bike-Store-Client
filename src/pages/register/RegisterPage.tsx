import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useAppDispatch } from "../../redux/hooks";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    password: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userInfo = await register(formData).unwrap();

      dispatch(setUser(userInfo));
      navigate("/login"); // Redirect to home page after successful registration
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return (
    <div>
      <div className="rounded-lg flex justify-center flex-1">
        <div className="w-full max-w-md  bg-white rounded-lg shadow-lg">
          <div className="flex justify-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="mt-3 flex flex-col items-center">
            <h3 className="text-2xl text-gray-700 font-bold text-center uppercase">
              Register
            </h3>
            <div className="w-full flex-1 mt-4">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-5 tracking-wide font-semibold bg-[#BD2A2E] text-gray-200 w-full py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none uppercase"
                >
                  <span className="ml-">Register</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service{" "}
                  </a>
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
