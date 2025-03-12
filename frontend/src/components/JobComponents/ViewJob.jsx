import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApplyJobForm from "./ApplyJobForm";
import axios from "axios";
import { MapPin, Briefcase, Calendar, DollarSign } from "lucide-react";
import BackButton from "../BackButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        if (response.data?.job) {
          setJob(response.data.job);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        setError("Error fetching job: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading job details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      {/* Back Button */}
      <BackButton />

      {/* Job Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-green-500 backdrop-blur-md">
        <h2 className="text-green-700 text-3xl font-bold text-center mb-6">{job.job_title}</h2>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center text-gray-700">
            <Briefcase size={20} className="mr-2 text-green-600" />
            <span className="font-semibold">{job.role || "Role Not Specified"}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin size={20} className="mr-2 text-green-600" />
            <span>{job.location || "Location Not Available"}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <DollarSign size={20} className="mr-2 text-green-600" />
            <span>{job.salary || "Salary Not Disclosed"}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar size={20} className="mr-2 text-green-600" />
            <span>Posted On: {job.posted_date || "N/A"}</span>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Job Description:</p>
          <p className="text-gray-900">{job.job_description}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Apply Now
          </button>

          {/* View Company Button */}
          <Link
            to={`/companies/${job.company_id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            View Company
          </Link>
        </div>
      </div>

      {isModalOpen && <ApplyJobForm onClose={() => setIsModalOpen(false)} jobId={id} />}
    </div>
  );
};

export default ViewJob;
