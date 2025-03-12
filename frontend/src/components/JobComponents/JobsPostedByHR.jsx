import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const JobsPostedByHR = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.userType === "hr") {
      const fetchJobs = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/hr/posted-jobs/${user.id}`);
          setJobs(response.data?.jobs || []);
        } catch (err) {
          setError("Failed to load job listings. Please try again.");
          console.error("Error fetching jobs:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchJobs();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-4/5">
        <h1 className="text-3xl font-bold mb-6 text-center text-white-800">Jobs Posted</h1>
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available at the moment.</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {jobs.map((job) => (
              <div key={job.job_id} className="p-4 border rounded-lg shadow-md bg-white-100 gap-5 flex items-center justify-between">
                
                {/* Job Profile Icon */}
                <div className="w-15 h-15 flex items-center justify-center bg-green-600 text-white text-lg font-bold rounded-full">
                  {job.job_title.charAt(0).toUpperCase()}
                </div>

                {/* Job Details */}
                <div className="flex flex-col flex-grow ml-4">
                  <h2 className="text-xl font-bold text-green-900">{job.job_title}</h2>
                  <div className="flex flex-col-3 justify-between gap-10">
                  <p className="text-green-700">Role: {job.role}</p>
                  <p className="text-green-700">Total Applicants: {job.total_applied}</p>
                  {/* <p className="text-green-700">Job Views: {job.job_view_count}</p> */}
                  </div>
                  <p className="text-green-700">Date Posted: {new Date(job.date_posted).toLocaleDateString()}</p>
                </div>

                {/* View Job Button */}
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto"
                  onClick={() => navigate(`/hr/job-details/${job.job_id}`)}
                >
                  View Full Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPostedByHR;
