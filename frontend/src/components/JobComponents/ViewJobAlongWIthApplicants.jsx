import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApplicantCard from "./ApplicantCard";
const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const ViewJobAlongWIthApplicants = () => {
  const { job_id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hr/job-details/${job_id}`);
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  // Handle Status Update
  const handleStatusChange = (application_id, newStatus) => {
    setJobData((prev) => ({
      ...prev,
      applied_candidates: prev.applied_candidates.map((applicant) =>
        applicant.application_id === application_id
          ? { ...applicant, application_status: newStatus }
          : applicant
      ),
    }));
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading job details...</div>;
  if (!jobData || !jobData.job) return <div className="text-center py-10 text-red-600">Job not found.</div>;

  const { job, applied_candidates } = jobData;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      
      {/* Job Details Section */}
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-green-700">{job.job_title}</h1>
        <p className="text-gray-600 mt-2">{job.job_description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-800">
          <p><strong>Role:</strong> {job.role}</p>
          <p><strong>Type:</strong> {job.job_type} | {job.employment_type}</p>
          <p><strong>Location:</strong> {job.job_location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Posted On:</strong> {new Date(job.date_posted).toLocaleDateString()}</p>
          <p><strong>Skills Required:</strong> {job.skills?.join(", ")}</p>
          <p><strong>Vacancies:</strong> {job.number_of_vacancies}</p>
          <p><strong>Total Applied:</strong> {job.total_applied}</p>
        </div>
      </div>

      {/* Applied Candidates Section */}
      <h2 className="mt-6 text-2xl font-semibold text-green-800">Applied Candidates</h2>
      {applied_candidates.length === 0 ? (
        <p className="text-gray-500 mt-2">No applications yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {applied_candidates.map((applicant) => (
            <ApplicantCard 
              key={applicant.application_id} 
              applicant={applicant} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default ViewJobAlongWIthApplicants;
