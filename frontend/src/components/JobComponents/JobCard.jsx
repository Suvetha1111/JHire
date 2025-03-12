import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";

const JobCard = ({ job }) => {
  // Extract company details safely
  const company = job.company_table || {}; 
  return (
    <div className="w-full p-6 border rounded-2xl shadow-lg bg-white mb-6 flex items-center">
      {/* Company Logo */}
      <div className="w-20 h-20 rounded-full flex-shrink-0">
        <img 
          src={company.company_logo ||`https://ui-avatars.com/api/?name=${job.job_title}`|| "joblogo.png"} 
          alt={company.company_name || "Company Logo"} 
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Job Details */}
      <div className="ml-6 flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{job.job_title}</h2>
        <p className="text-gray-600 text-sm">{company.company_name || "Unknown Company"}</p>

        {/* Location & Employment Type */}
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin size={16} className="mr-1" />
          <span className="mr-4">{job.job_location || "Location not specified"}</span>
          <Briefcase size={16} className="mr-1" />
          <span>{job.employment_type || "N/A"}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap mt-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* View Details Button */}
      <Link
        to={`/jobs/${job.job_id}`}
        className="ml-auto px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
