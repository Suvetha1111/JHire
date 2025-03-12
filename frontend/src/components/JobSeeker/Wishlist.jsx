import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { FaBuilding, FaMapMarkerAlt, FaBriefcase, FaTrash } from "react-icons/fa";
import {useNavigate } from 'react-router-dom';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const Wishlist = () => {
  const navigate=useNavigate()
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/seeker/wishlist/${user.id}`);
        console.log("Wishlist API Response:", response.data); // Debugging Response
        setWishlist(Array.isArray(response.data?.wishlist) ? response.data.wishlist : []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch wishlist.");
      }
    };

    fetchWishlist();
  }, [user]);
  const handleapply=(id)=>{
    console.log("hi"+id)
    navigate(`/jobs/${id}`)

}  
const removeFromWishlist = async (jobId) => {
    try {
      await axios.delete(`${API_BASE_URL}/seeker/delwishlist/${user.id}/${jobId}`);
      setWishlist((prev) => prev.filter((job) => job.job_id !== jobId));
    } catch (err) {
      setError("Failed to remove job from wishlist.",err.message);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Wishlist</h2>

      {error && <p className="text-red-500 text-lg">{error}</p>}

      {wishlist.length === 0 && !error ? (
        <p className="text-gray-600 text-lg">No jobs in wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(({ job_id, jobs_table }) => {
            // ✅ Fixing how we access job details
            const jobTitle = jobs_table?.job_title || "Unknown Title";
            const jobLocation = jobs_table?.job_location || "Unknown Location";
            const jobType = jobs_table?.job_type || "Unknown Type";
            const companyName = jobs_table?.company?.company_name || "Unknown Company";

            return (
              <div
                key={job_id}
                className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all"
              >
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{jobTitle}</h3>
                  <button
                    onClick={() => removeFromWishlist(job_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>

                <p className="text-gray-600 flex items-center gap-2">
                  <FaBuilding className="text-gray-500" />
                  {companyName}
                </p>

                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt className="text-gray-500" />
                  {jobLocation}
                </p>

                <p className="text-gray-400 flex items-center gap-2 mt-1">
                  <FaBriefcase className="text-gray-500" />
                  {jobType}
                </p>

                

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all" onClick={()=>handleapply(job_id)}>
                  Apply Now
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
