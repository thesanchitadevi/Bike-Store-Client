/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { decodeToken } from "../../utils/decodeToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { FieldValues, useForm } from "react-hook-form";
import Logo from "../../assets/Logo";
import { Shield, Loader2 } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const location = useLocation(); // Get the current location

  const [login, { error }] = useLoginMutation();
  const [loadingCredentials, setLoadingCredentials] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();

  // Test credentials that exist in your database
  const testCredentials = {
    admin: {
      email: "admin@email.com", // Replace with actual admin email in your DB
      password: "admin", // Replace with actual admin password in your DB
    },
  };

  // Function to fill credentials and verify they exist in database
  const fillCredentials = async (role: "admin") => {
    setLoadingCredentials(role);
    try {
      // Test login to verify credentials exist in database
      const testUserInfo = {
        email: testCredentials[role].email,
        password: testCredentials[role].password,
      };

      // Attempt login to verify credentials are valid
      const res = await login(testUserInfo).unwrap();

      // If login successful, decode token to verify role
      const user = decodeToken(res.data.accessToken) as TUser;

      // Check if the user has the expected role
      if (user.role !== role) {
        throw new Error(
          `User role mismatch. Expected: ${role}, Got: ${user.role}`
        );
      }

      // Fill the form with verified credentials
      setValue("email", testCredentials[role].email);
      setValue("password", testCredentials[role].password);

      toast.success(
        `${
          role.charAt(0).toUpperCase() + role.slice(1)
        } credentials filled and verified!`,
        {
          duration: 1500,
        }
      );
    } catch (error: any) {
      console.error(`Failed to verify ${role} credentials:`, error);

      // Still fill the form even if verification fails
      setValue("email", testCredentials[role].email);
      setValue("password", testCredentials[role].password);

      toast.warning(
        `${
          role.charAt(0).toUpperCase() + role.slice(1)
        } credentials filled (verification failed - please check if account exists)`,
        {
          duration: 3000,
        }
      );
    } finally {
      setLoadingCredentials(null);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap(); // unwrap() is a utility function that extracts the data from the response object

      const user = decodeToken(res.data.accessToken) as TUser;

      dispatch(
        setUser({
          user: {
            userId: user.userId,
            name: user.name,
            role: user.role,
            email: user.email,
          },
          token: res.data.accessToken,
        })
      );

      toast.success("Logged in successfully", {
        id: toastId,
        duration: 2000,
      });

      // Retrieve last visited path or go to home
      const lastPath = sessionStorage.getItem("lastPath") || "/";
      sessionStorage.removeItem("lastPath"); // Clear stored path after use

      const redirectPath =
        user.role === "admin" ? "/admin/dashboard" : lastPath;

      navigate(redirectPath, { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen justify-center items-center py-12 bg-gray-100">
      <div className="flex justify-center">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="w-full py-8 m-auto rounded-sm shadow-xl md:max-w-sm">
        <div className="mb-4 text-center">
          <h1 className="my-3 text-2xl font-bold uppercase">Login</h1>
          {error && (
            <p className="text-red-500 mb-4">Login failed. Please try again.</p>
          )}
          <p className="text-sm dark:text-gray-600 uppercase">
            Login to your account to continue
          </p>
        </div>

        {/* Quick Login Credentials */}
        <div className="mb-6 px-3">
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => fillCredentials("admin")}
              disabled={loadingCredentials !== null}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingCredentials === "admin" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Shield size={16} />
              )}
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <div className="m-3">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-3 py-2 my-1 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BD2A2E] focus:border-transparent"
            />
          </div>
          <div className="m-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 my-1 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BD2A2E] focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Wrong Password</p>
            )}
          </div>

          <div className="m-3 pt-6">
            <button
              type="submit"
              className="flex justify-center gap-2 w-full bg-[#BD2A2E] text-white py-4 px-4 font-semibold hover:bg-gray-800 cursor-pointer uppercase transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-5">
          <p className="px-6 text-medium text-center space-y-2 text-gray-800">
            Don't have an account yet? {""}
            <Link
              rel="noopener noreferrer"
              to="/register"
              className="hover:underline "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
