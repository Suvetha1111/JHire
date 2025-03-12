import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import {
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
} from "react-icons/fa";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const SeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/seeker/${user.id}`, {
          withCredentials: true,
        });
        if (response.data && response.data.data.length > 0) {
          setProfile(response.data.data[0]);
        } else {
          setError("Seeker profile not found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">Loading profile...</div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center text-red-500 mt-10">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10 text-gray-800 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6">
        <div className="flex items-center space-x-6">
          <img
            src={
              profile.profile_url ||
              `https://ui-avatars.com/api/?name=${profile.first_name}`
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-green-500"
          />
          <div>
            <h1 className="text-3xl font-semibold text-green-700">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-lg text-gray-500">{profile.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-green-600">About Me</h2>
            <p className="text-gray-700 mt-2">{profile.about_me}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">Education</h2>
            <p>
              <FaGraduationCap className="inline text-green-500 mr-2" />
              <strong>{profile.university_name}</strong> ({profile.passing_year}
              )
            </p>
            <p className="text-gray-600">
              {profile.degree_name} in {profile.specialization}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">Experience</h2>
            <p>
              <FaBriefcase className="inline text-green-500 mr-2" />
              <strong>{profile.previous_company}</strong> -{" "}
              {profile.previous_job_role}
            </p>
            <p className="text-gray-600">{profile.years_of_experience} years</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">
                  No skills provided
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-600">Job Overview</h2>
          <p>
            <FaGraduationCap className="inline text-green-500 mr-2" />
            <strong>Qualification:</strong> {profile.degree_name}
          </p>
          <p>
            <FaBriefcase className="inline text-green-500 mr-2" />
            <strong>Experience:</strong> {profile.years_of_experience} Years
          </p>
          <p>
            <FaMapMarkerAlt className="inline text-green-500 mr-2" />
            <strong>Location:</strong> {profile.city_name},{" "}
            {profile.country_name}
          </p>

          <h2 className="text-xl font-semibold text-green-600 mt-6">Contact</h2>
          <p>
            <FaEnvelope className="inline text-green-500 mr-2" />
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <FaPhone className="inline text-green-500 mr-2" />
            <strong>Phone:</strong> {profile.phone_number}
          </p>
          <a
            href={profile.seeker_linkedin_profile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block mt-2"
          >
            <FaLinkedin className="inline text-blue-500 mr-2" />
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
