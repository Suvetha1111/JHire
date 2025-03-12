import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { FaPhone, FaEnvelope, FaBriefcase, FaLinkedin, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const ViewHRProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();
    const {hr_id}= useParams();
  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`${API_BASE_URL}/hr/${hr_id}`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching HR profile:", error));
  }, [user?.id]);

  if (!profile) {
    return <p className="text-center text-green-600 font-semibold text-lg mt-10">Loading HR profile...</p>;
  }
  const titleCase = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-green-50 p-10 flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-6 border-b-green-200 pb-4">
        <div className="w-30 h-30 rounded-full border-4 border-green-500 overflow-hidden">
          <img
            src={profile.hr_photo || `https://ui-avatars.com/api/?name=${profile.first_name}`}
            alt="HR Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-green-700">{titleCase(profile.first_name)} {titleCase(profile.last_name)}</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <FaEnvelope className="text-green-500" /> {profile.email}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-700">About Me</h3>
        <p className="text-gray-700 mt-2">{profile.about_me}</p>
      </div>

      {/* Education & Experience */}
      <div className="mt-6 flex gap-16">
        <div>
          <h3 className="text-xl font-semibold text-green-700">Education</h3>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <FaGraduationCap className="text-green-500" /> <strong>{profile.university_name}</strong> ({profile.degree_name} in {profile.specialization})
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700">Experience</h3>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <FaBriefcase className="text-green-500" /> <strong>{profile.role}</strong> - {profile.years_of_experience} years
          </p>
        </div>
      </div>

      {/* Job Overview & Contact */}
      <div className="mt-6 flex gap-16">
        <div>
          <h3 className="text-xl font-semibold text-green-700">Job Overview</h3>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <FaGraduationCap className="text-green-500" /> <strong>Qualification:</strong> {profile.degree_name}
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <FaBriefcase className="text-green-500" /> <strong>Experience:</strong> {profile.years_of_experience} Years
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <FaMapMarkerAlt className="text-green-500" /> <strong>Location:</strong> {profile.location || "N/A"}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700">Contact</h3>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <FaEnvelope className="text-green-500" /> {profile.email}
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <FaPhone className="text-green-500" /> {profile.phone_number}
          </p>
          {profile.hr_linkedin_profile && (
            <p className="flex items-center gap-2 mt-2">
              <FaLinkedin className="text-green-500 text-lg" />
              <a href={profile.hr_linkedin_profile} target="_blank" className="text-green-600 hover:underline font-medium">
                LinkedIn Profile
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-700">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {profile.skills?.length > 0 ? (
            profile.skills.map((skill, index) => (
              <span key={index} className="bg-green-300 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-700">N/A</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewHRProfile;
