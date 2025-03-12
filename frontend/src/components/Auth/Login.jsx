import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api/axiosInstance";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        { email: email.toLowerCase(), password },
        { withCredentials: true }
      );

      setUser(response.data.user);
      setLoading(false);
      
      toast.dismiss();
      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      {/* Login Container */}
      <div className="flex bg-white rounded-2xl shadow-lg w-[800px] overflow-hidden">
        {/* Left Side */}
        <div className="bg-green-600 text-white flex flex-col items-center justify-center w-1/2 p-8">
          <img src="logo.avif" alt="Logo" className="w-16 h-16 mb-4 rounded-full" />
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-center text-sm">
            Connect with creators and directors effortlessly. Experience a seamless way to collaborate and bring ideas to life!
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Login</h2>
          <p className="text-gray-500 mb-6">Access your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Password Input with Eye Icon */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <span
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <Link to='/forgotpass'><p>Forgot Password?</p></Link>
            </div>

            {/* Login Button with Loading State */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-gray-600 text-sm mt-4 text-center">
            Don&apos;t have an account?{" "}
            <span
              className="text-green-500 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;
