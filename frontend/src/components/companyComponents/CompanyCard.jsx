import React from "react";
import PropTypes from "prop-types"; 
import { FaMapMarkerAlt, FaLink, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-green-300 hover:shadow-2xl transition duration-300 flex flex-col justify-between">
      
      <div>
        <h2 className="text-2xl font-bold text-green-700">{company.company_name}</h2>
        
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-2 
          ${company.company_type ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}
        `}>
          {company.company_type || "Not Specified"}
        </span>

        {company.company_location_city && company.company_location_country && (
          <p className="text-gray-600 text-sm flex items-center mt-2">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            {company.company_location_city}, {company.company_location_country}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {/* Website */}
        {company.company_website && (
          <a
            href={company.company_website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-green-600 font-medium hover:underline"
          >
            <FaLink className="mr-1" /> Visit Website
          </a>
        )}

        {/* LinkedIn Profile */}
        {company.company_linkedin_profile && (
          <a
            href={company.company_linkedin_profile}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 font-medium hover:underline"
          >
            <FaLink className="mr-1" /> LinkedIn Profile
          </a>
        )}
        <Link
            to={`/companies/${company.company_id}`}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            View Company
          </Link>
      </div>
    </div>
  );
};

// Add PropTypes validation
CompanyCard.propTypes = {
  company: PropTypes.shape({
    company_name: PropTypes.string.isRequired,
    company_website: PropTypes.string,
    company_type: PropTypes.string,
    company_linkedin_profile: PropTypes.string,
    company_location_city: PropTypes.string,
    company_location_country: PropTypes.string,
    company_email_domain: PropTypes.string,
  }).isRequired,
};

export default CompanyCard;
