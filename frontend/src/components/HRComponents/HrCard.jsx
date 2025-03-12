import React from "react";
import { Link } from "react-router-dom";

const HrCard = ({ hr }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow">
      <img
        src={hr.hr_photo || `https://ui-avatars.com/api/?name=${hr.first_name}+${hr.last_name}`}
        alt={`${hr.first_name} ${hr.last_name}`}
        className="w-24 h-24 rounded-full border border-gray-300 object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          {hr.first_name} {hr.last_name}
        </h2>
        <p className="text-sm text-gray-500">{hr.role} - {hr.department || "General HR"}</p>
        <p className="text-sm text-gray-600 mt-2">{hr.about_me || "No details available."}</p>
        
        {hr.skills && hr.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {hr.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-2 mt-3">
        {hr.hr_linkedin_profile && (
          <a
            href={hr.hr_linkedin_profile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-green-600 hover:underline text-sm"
          >
            View LinkedIn
          </a>
        )}

<div>
        <Link
          to={`/hr/${hr.hr_id}`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-md"
        >
          View Profile
        </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HrCard;
