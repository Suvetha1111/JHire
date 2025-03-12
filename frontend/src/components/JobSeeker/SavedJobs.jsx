import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { FaBuilding, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const SavedJobs = () => {
  const { user } = useUser(); 
  const [savedJobs, setSavedJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/seeker/applied/${user.id}`);
        setSavedJobs(Array.isArray(response.data?.savedJobs) ? response.data.savedJobs : []);
        console.log(response.data.savedJobs);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch saved jobs.");
      }
    };

    fetchSavedJobs();
  }, [user]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h2>

      {error && <p className="text-red-500 text-lg">{error}</p>}

      {savedJobs.length === 0 && !error ? (
        <p className="text-gray-600 text-lg">No Applied jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map(({ job_id, job_title, job_location, job_type, company_table }) => (
            <div
              key={job_id}
              className="p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900">{job_title}</h3>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <FaBuilding className="text-gray-500" />
                {company_table?.company_name || "Unknown Company"}
              </p>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <FaMapMarkerAlt className="text-gray-500" />
                {job_location}
              </p>
              <p className="text-gray-400 flex items-center gap-2 mt-1">
                <FaBriefcase className="text-gray-500" />
                {job_type}
              </p>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default SavedJobs;
