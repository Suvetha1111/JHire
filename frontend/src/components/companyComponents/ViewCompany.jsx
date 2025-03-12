import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const ViewCompany = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [hrListings, setHrListings] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const companyResponse = await axios.get(`${API_BASE_URL}/companies/${companyId}`);
        setCompany(companyResponse.data || null);
        console.log(company);
        const hrResponse = await axios.get(`${API_BASE_URL}/hr/getHRsByCompany/${companyId}`);
        setHrListings(Array.isArray(hrResponse.data) ? hrResponse.data : []);
        console.log(hrListings);
        const jobResponse = await axios.get(`${API_BASE_URL}/jobs?company_id=${companyId}`);
        setJobListings(Array.isArray(jobResponse.data) ? jobResponse.data : []);

      } catch (err) {
        setError(`Error fetching company details: ${err.response?.data?.message || err.message}`);
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (loading) return <p className="text-center text-gray-600 text-lg">Loading company details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md transition-all"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Company Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">🏢 About the Company</h2>
          {company ? (
            <>
              <p className="text-xl font-semibold">{company.company_name || "Company Name Not Available"}</p>
              <p className="text-sm text-gray-600">{company.company_type || "Type not specified"}</p>
              <p className="text-sm text-gray-500">
                {company.company_location_city || "City not specified"}, {company.company_location_country || "Country not specified"}
              </p>
              <p className="text-sm text-gray-500">📌 Pin Code: {company.office_pin_code || "N/A"}</p>
              <div className="mt-3 space-y-2">
                {company.company_website && (
                  <a
                    href={company.company_website}
                    className="text-blue-600 hover:underline flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌍 Company Website
                  </a>
                )}
                {company.company_linkedin_profile && (
                  <a
                    href={company.company_linkedin_profile}
                    className="text-blue-600 hover:underline flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 LinkedIn Profile
                  </a>
                )}
              </div>
            </>
          ) : (
            <p>Company details not found</p>
          )}
        </div>

        {/* HR Listings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">🧑‍💼 HR Listings</h2>
          {hrListings.length > 0 ? (
            <div className="space-y-4">
              {hrListings.map((hr, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow">
                  <h3 className="font-semibold text-lg">{hr.name}</h3>
                  <p className="text-sm text-gray-600">{hr.role || "Role not specified"}</p>
                  {hr.skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hr.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No skills listed</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No HR listings available</p>
          )}
        </div>

        {/* Job Listings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">💼 Job Listings</h2>
          {jobListings.length > 0 ? (
            <div className="space-y-4">
              {jobListings.map((job, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company || "Company not specified"} - {job.location || "Location not available"}</p>
                  <p className="text-sm text-gray-500">{job.type || "Job type not specified"}</p>
                  {job.skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No skills listed</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No job listings available</p>
          )}
        </div>
      </div>


    </div>
  );
};

export default ViewCompany;
