// export default SeekerCard;
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";

const SeekerCard = ({ seeker }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-green-300 hover:shadow-2xl transition duration-300 flex items-center gap-6">
      {/* Profile Image */}
      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
        {seeker.first_name ? seeker.first_name.charAt(0) : "?"}
      </div>

      {/* Details Section */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-green-800">
          {seeker.first_name} {seeker.last_name}
        </h3>
        <p className="text-sm text-gray-600">
          {seeker.specialization || "Specialization not provided"}
        </p>

        {/* Skills */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {seeker.skills && seeker.skills.length > 0 ? (
            seeker.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No skills listed</span>
          )}
        </div>
      </div>

      {/* Profile Link Button */}
      <div>
        <Link
          to={`/seeker-profile/${seeker.seeker_id}`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-md"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

/* ✅ Add PropTypes for validation */
SeekerCard.propTypes = {
  seeker: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    specialization: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    seeker_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default SeekerCard;

