import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import JobFiltering from "./JobFiltering";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("Fetching jobs from:", `${API_BASE_URL}/jobs`);
        const response = await axios.get(`${API_BASE_URL}/jobs`);

        if (response.data?.jobs && Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs);
          setFilteredJobs(response.data.jobs);
        } else {
          throw new Error("Unexpected API response format.");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyFilters = (filters) => {
    console.log("Applying filters:", filters);

    let filteredResults = jobs;

    if (filters.jobType?.length) {
      filteredResults = filteredResults.filter((job) =>
        filters.jobType.includes(job.jobType)
      );
    }

    if (filters.employmentType?.length) {
      filteredResults = filteredResults.filter((job) =>
        filters.employmentType.includes(job.employmentType)
      );
    }

    if (filters.location?.length) {
      filteredResults = filteredResults.filter((job) =>
        filters.location.includes(job.location)
      );
    }

    if (filters.salaryRange?.length) {
      filteredResults = filteredResults.filter((job) =>
        filters.salaryRange.includes(job.salaryRange)
      );
    }

    if (filters.skills?.length) {
      filteredResults = filteredResults.filter((job) =>
        filters.skills.every((skill) => job.skills.includes(skill))
      );
    }

    setFilteredJobs(filteredResults);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  useEffect(() => {
    console.log("Updated filteredJobs:", filteredJobs);
  }, [filteredJobs]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="flex">
      {/* Left Side - Filters */}
      <div className="w-1/4 p-4">
      <JobFiltering onApplyFilters={applyFilters} onResetFilters={resetFilters} />
      </div>

      {/* Right Side - Job Listings */}
      <div className="w-3/4 p-4">
        {loading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found matching your filters.</p>
        ) : (
          <>
            {currentJobs.map((job, index) => (
              <JobCard key={job.id || `job-${index}`} job={job} />
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobListing;