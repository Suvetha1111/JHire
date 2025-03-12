import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const CompanyListing = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/companies`);
        if (response.data?.companies && Array.isArray(response.data.companies)) {
          setCompanies(response.data.companies);
        } else {
          throw new Error("Unexpected API response format.");
        }
      } catch (err) {
        setError("Failed to load companies. Please try again.");
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Pagination logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(companies.length / companiesPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading companies...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Company Listings</h1>

      {currentCompanies.length === 0 ? (
        <p className="text-center text-gray-500">No companies available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCompanies.map((company) => (
            <CompanyCard key={company.company_id} company={company} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {companies.length > companiesPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            className={`px-4 py-2 border rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

          <button
            className={`px-4 py-2 border rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyListing;
