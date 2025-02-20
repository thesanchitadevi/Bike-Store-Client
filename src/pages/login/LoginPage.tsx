import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { decodeToken } from "../../utils/decodeToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { FieldValues, useForm } from "react-hook-form";
import Logo from "../../assets/Logo";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation(); // Get the current location

  const [login, { error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

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
        <div className="mb-8 text-center">
          <h1 className="my-3 text-2xl font-bold uppercase">Login</h1>
          {error && (
            <p className="text-red-500 mb-4">Login failed. Please try again.</p>
          )}
          <p className="text-sm dark:text-gray-600 uppercase">
            Login to your account to continue
          </p>
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
              className="w-full px-3 py-2 my-1 border border-gray-200 rounded-md"
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
              className="w-full px-3 py-2 my-1 border border-gray-200 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Wrong Password</p>
            )}
          </div>

          <div className="m-3 pt-10">
            <button
              type="submit"
              className="flex justify-center gap-2 w-full bg-[#BD2A2E] text-white py-4 px-4 font-semibold hover:bg-gray-800 cursor-pointer uppercase"
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
