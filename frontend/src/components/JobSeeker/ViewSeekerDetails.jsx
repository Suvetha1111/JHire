import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const ViewSeekerDetails = () => {
  const { seeker_id } = useParams();
  const navigate = useNavigate();
  const [seeker, setSeeker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeekerDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/seeker/${seeker_id}`, { withCredentials: true });
        if (response.data && response.data.data.length > 0) {
          setSeeker(response.data.data[0]);
        } else {
          setError("Seeker details not found.");
        }
      } catch (err) {
        console.error("Error fetching seeker details:", err);
        setError("Failed to load seeker details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeekerDetails();
  }, [seeker_id]);

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading seeker details...</div>;

  if (error) return (
    <div className="flex flex-col items-center text-red-500 mt-10">
      <p>{error}</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
        Go Back
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10 text-gray-800 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6">
        <div className="flex items-center space-x-6">
          <img
            src={seeker.profile_url || `https://ui-avatars.com/api/?name=${seeker.first_name}`}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-green-500"
          />
          <div>
            <h1 className="text-3xl font-semibold text-green-700">{seeker.first_name} {seeker.last_name}</h1>
            <p className="text-lg text-gray-500">{seeker.email}</p>
          </div>
        </div>
         <div className="mt-4 md:mt-0 flex space-x-3">
          {/* <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">Shortlist</button> */}
          <a href={seeker.resume} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Veiw Resume</a>
        </div> 
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-green-600">About Candidate</h2>
            <p className="text-gray-700 mt-2">{seeker.about_me}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">Education</h2>
            <p><FaGraduationCap className="inline text-green-500 mr-2" /><strong>{seeker.university_name}</strong> ({seeker.passing_year})</p>
            <p className="text-gray-600">{seeker.degree_name} in {seeker.specialization}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600">Experience</h2>
            <p><FaBriefcase className="inline text-green-500 mr-2" /><strong>{seeker.previous_company}</strong> - {seeker.previous_job_role}</p>
            <p className="text-gray-600">{seeker.years_of_experience} years</p>
          </div>
          <div>
  <h2 className="text-xl font-semibold text-green-600">Skills</h2>
  <div className="flex flex-wrap gap-2 mt-2">
    {Array.isArray(seeker.skills) && seeker.skills.length > 0 ? (
      seeker.skills.map((skill) => (
        <span
          key={skill}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </span>
      ))
    ) : (
      <span className="text-gray-500 text-sm">No skills provided</span>
    )}
  </div>
</div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-600">Job Overview</h2>
          <p><FaGraduationCap className="inline text-green-500 mr-2" /><strong>Qualification:</strong> {seeker.degree_name}</p>
          <p><FaBriefcase className="inline text-green-500 mr-2" /><strong>Experience:</strong> {seeker.years_of_experience} Years</p>
          <p><FaMapMarkerAlt className="inline text-green-500 mr-2" /><strong>Location:</strong> {seeker.city_name}, {seeker.country_name}</p>

          <h2 className="text-xl font-semibold text-green-600 mt-6">Contact</h2>
          <p><FaEnvelope className="inline text-green-500 mr-2" /><strong>Email:</strong> {seeker.email}</p>
          <p><FaPhone className="inline text-green-500 mr-2" /><strong>Phone:</strong> {seeker.phone_number}</p>
          <a href={seeker.seeker_linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block mt-2">
            <FaLinkedin className="inline text-blue-500 mr-2" />LinkedIn Profile
          </a>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={() => navigate(-1)} className="px-5 py-3 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewSeekerDetails;