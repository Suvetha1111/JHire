import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext"; // ✅ Import context
import {
  FaUser,
  FaBriefcase,
  FaPlus,
  FaEdit,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import HRProfile from "./HRProfile";
import PostJobForm from "../JobComponents/PostJobForm";
import JobsPostedByHR from "../JobComponents/JobsPostedByHR";
import HRProfileUpdate from "./HRProfileUpdate";

const API_BASE_URL =
  import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const HRDashboard = () => {
  const { user } = useUser(); // ✅ Get user from context
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userType === "hr") {
      axios
        .get(`${API_BASE_URL}/hr/${user.id}`) // ✅ Use HR ID from context
        .then((response) => setProfile(response.data))
        .catch((error) => console.error("Error fetching HR profile:", error));
    }
  }, [user]); // ✅ Run only when `user` changes

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <HRProfile />;
      case "edit-profile":
        return <HRProfileUpdate />;
      case "jobs":
        return <JobsPostedByHR />;
      case "post-job":
        return <PostJobForm />;
      default:
        return <JobsPostedByHR />;
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex justify-between p-4 md:hidden">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <FaTimes size={24} className="text-green-600" />
          ) : (
            <FaBars size={24} className="text-green-600" />
          )}
        </button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <FaSun size={24} className="text-yellow-400" />
          ) : (
            <FaMoon size={24} className="text-gray-400" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 ${
          darkMode ? "bg-green-900" : "bg-green-700"
        } text-white shadow-lg p-6 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {user?.first_name
            ? user.first_name.charAt(0).toUpperCase() +
              user.first_name.slice(1).toLowerCase()
            : ""}
        </h2>
        <img
          src={
            user.photo_url ||
            `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
          }
          alt="HR Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white mx-auto"
        />
        <ul className="mt-6 text-center">
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:bg-green-800 py-2 px-4 rounded-lg cursor-pointer"
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> My Profile
          </li>
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:bg-green-800 py-2 px-4 rounded-lg cursor-pointer"
            onClick={() => setActiveTab("edit-profile")}
          >
            <FaEdit /> Update Profile
          </li>
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:bg-green-800 py-2 px-4 rounded-lg cursor-pointer"
            onClick={() => setActiveTab("jobs")}
          >
            <FaBriefcase /> My Jobs
          </li>
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:bg-green-800 py-2 px-4 rounded-lg cursor-pointer"
            onClick={() => setActiveTab("post-job")}
          >
            <FaPlus /> Post a Job
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 transition-all">{renderContent()}</div>
    </div>
  );
};

export default HRDashboard;
