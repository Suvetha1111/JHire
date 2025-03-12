import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthNavbar = () => {
  const { user, setUser, setIsAuthenticated } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      
      await api.post("/auth/logout", {}, { withCredentials: true });
      toast.dismiss();
      toast.success("Logged out successfully!");
      
      setTimeout(() => {
        navigate("/login");
      }, 10);
    } catch (error) {
      toast.dismiss();

      toast.error("Failed to logout. Please try again.");
    }
  };
  

  return (
    <>
      <nav className="bg-green-700 p-4 text-white shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl flex items-center font-bold tracking-wide hover:text-green-300 transition"
            style={{ fontFamily: "var(--eb_garamond-font)" }}
          >
            <img
              src="logo.avif"
              alt="Logo"
              className="w-10 h-10 rounded-full mr-2"
            />
            <p>JHire</p>
          </Link>

          <div
            className="hidden md:flex space-x-6 mx-auto"
            style={{ fontFamily: "var(--eb_garamond-font)" }}
          >
            <Link to="/" className="hover:text-green-300 transition">
              Home
            </Link>
            <Link to="/candidates" className="hover:text-green-300 transition">
              Candidates
            </Link>
            <Link to="/alljobs" className="hover:text-green-300 transition">
              Jobs
            </Link>
            <Link to="/companies" className="hover:text-green-300 transition">
              Companies
            </Link>

            {/* Show "Post Job" only for HRs */}
            {user?.userType === "hr" && (
              <Link to="/post-job" className="hover:text-green-300 transition">
                Post Job
              </Link>
            )}
            {user?.userType === "seeker" && (
              <Link to="/recruiters" className="hover:text-green-300 transition">
                Find Recruiter
              </Link>
              
            )}
            {user && (
              <Link to={user.userType === "hr" ? "/hr-dashboard" : "/seeker-dashboard"}>
              Dash Board
            </Link>
              
            )}
            
            
          </div>

          {/* Right-Side Authentication Links */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-medium">
                <Link to={user.userType === "hr" ? "/hr-dashboard" : "/seeker-dashboard"}>
                Welcome, {user.first_name}!
                </Link>
                  
                </span>
                <Link to={user.userType === "hr" ? "/hr-dashboard" : "/seeker-dashboard"}>
                  <img
                    src={
                      user.photo_url ||
                      `https://ui-avatars.com/api/?name=${user.first_name}`
                    }
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-black font-medium hover:text-gray-700 transition"
                  style={{ fontFamily: "var(--gorditas-font)" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-lg font-bold"
                  style={{ fontFamily: "var(--gorditas-font)" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
            <Link to="/" className="hover:text-green-300 transition">
              Home
            </Link>
            <Link to="/candidates" className="hover:text-green-300 transition">
              Candidates
            </Link>
            <Link to="/alljobs" className="hover:text-green-300 transition">
              Jobs
            </Link>
            {/* Show "Post Job" only for HRs */}
            {user?.userType === "hr" && (
              <Link to="/post-job" className="hover:text-green-300 transition">
                Post Job
              </Link>
            )}
            {!user && (
              <>
                <Link to="/login" className="hover:text-green-300 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default AuthNavbar;
