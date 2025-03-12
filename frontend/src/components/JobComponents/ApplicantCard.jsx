import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const ApplicantCard = ({ applicant, onStatusChange }) => {
  const [status, setStatus] = useState(applicant.application_status);
  const navigate=useNavigate();
  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/hr/update-job-status/${applicant.application_id}`, {
        application_status: newStatus,
      });
      setStatus(newStatus);
      onStatusChange(applicant.application_id, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Profile picture fallback
  const profilePicture = applicant.seeker_table.profile_url
    ? applicant.seeker_table.profile_url
    : `https://ui-avatars.com/api/?name=${applicant.seeker_table.first_name}+${applicant.seeker_table.last_name}`;

  return (
    <div className="p-4 bg-gray-100 rounded-lg flex items-center shadow-md w-full justify-between">
      {/* Profile Image & Details */}
      <div className="flex items-center">
        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-4">
          <h3 className="text-lg font-semibold text-green-900">
            {applicant.seeker_table.first_name} {applicant.seeker_table.last_name}
          </h3>
          <p className="text-sm text-gray-700"><strong>Email:</strong> {applicant.seeker_table.email}</p>
          <p className="text-sm text-gray-700"><strong>Phone:</strong> {applicant.seeker_table.phone_number}</p>
          <p className="text-sm text-gray-700"><strong>Skills:</strong> {applicant.seeker_table.skills?.join(", ")}</p>
        </div>
      </div>

      {/* Status & Actions */}
      <div className="flex flex-col items-end">
        {/* Status Update Buttons */}
        <div className="flex space-x-2 mb-2">
          {['Applied', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'].map((state) => (
            <button
              key={state}
              className={`px-3 py-1 text-sm rounded-md transition hover:cursor-pointer ${status === state ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => handleStatusUpdate(state)}
            >
              {state}
            </button>
          ))}
        </div>

       
        <button
      className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
      onClick={() => navigate(`/seeker-profile/${applicant.seeker_table.seeker_id}`)}
    >
      View Profile
    </button>

        {/* Applied Date */}
        <p className="text-xs text-gray-500 mt-2">Applied On: {new Date(applicant.applied_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ApplicantCard;