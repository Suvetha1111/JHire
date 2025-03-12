import React, { useEffect, useState } from "react";
import axios from "axios";
import HrCard from "./HrCard";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const HrListing = () => {
  const [hrs, setHrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const hrsPerPage = 6;

  useEffect(() => {
    const fetchHrs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hr`);
        if (response.data?.hrs && Array.isArray(response.data.hrs)) {
          setHrs(response.data.hrs);
        } else {
          throw new Error("Unexpected API response format.");
        }
      } catch (err) {
        setError("Failed to load HR profiles. Please try again.");
        console.error("Error fetching HR profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHrs();
  }, []);

  // Pagination logic
  const indexOfLastHr = currentPage * hrsPerPage;
  const indexOfFirstHr = indexOfLastHr - hrsPerPage;
  const currentHrs = hrs.slice(indexOfFirstHr, indexOfLastHr);
  const totalPages = Math.ceil(hrs.length / hrsPerPage);

  if (loading)
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading HR profiles...</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen bg-gray-100">{error}</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-950">HR Profiles</h1>
        <p className="text-lg text-green-600 mt-2">
          Explore our HR professionals specializing in various industries.
        </p>
      </div>

      {currentHrs.length === 0 ? (
        <p className="text-center text-green-500 text-lg">No HR profiles available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {currentHrs.map((hr) => (
            <div key={hr.hr_id} className="transition-transform transform hover:scale-105">
              <HrCard hr={hr} />
            </div>
          ))}
        </div>
      )}

      {hrs.length > hrsPerPage && (
        <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            className={`px-5 py-2 rounded-full font-medium transition ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>

          <button
            className={`px-5 py-2 rounded-full font-medium transition ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white"
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

export default HrListing;
