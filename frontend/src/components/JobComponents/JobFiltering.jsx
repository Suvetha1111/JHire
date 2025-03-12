import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const JobFiltering = ({ onApplyFilters, onResetFilters }) => {
  const [filters, setFilters] = useState({
    jobTypes: [],
    employmentTypes: [],
    locations: [],
    companies: [],
    salaryRanges: [],
    skills: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    jobTypes: [],
    employmentTypes: [],
    locations: [],
    companies: [],
    salaryRanges: [],
    skills: [],
  });

  const [openSections, setOpenSections] = useState({
    jobTypes: false,
    employmentTypes: false,
    locations: false,
    companies: false,
    salaryRanges: false,
    skills: false,
  });

  useEffect(() => {
    fetch("http://localhost:5000/jhire/jobs")
      .then((response) => response.json())
      .then((data) => {
        if (!data || !Array.isArray(data.jobs)) {
          throw new Error("Invalid jobs data format: " + JSON.stringify(data));
        }

        const jobs = data.jobs;
        const jobTypes = [...new Set(jobs.map((job) => job.job_type))].sort();
        const employmentTypes = [...new Set(jobs.map((job) => job.employment_type))].sort();
        const locations = [...new Set(jobs.map((job) => job.job_location))].sort();
        const skills = [...new Set(jobs.flatMap((job) => job.skills))].sort();

        const salaries = jobs.map((job) => parseInt(job.salary, 10)).filter((s) => !isNaN(s));
        if (salaries.length > 0) {
          const minSalary = Math.min(...salaries);
          const maxSalary = Math.max(...salaries);
          const roundedMin = Math.floor(minSalary / 5000) * 5000;
          const roundedMax = Math.ceil(maxSalary / 5000) * 5000;
          const step = Math.ceil((roundedMax - roundedMin) / 5);
          const salaryRanges = Array.from({ length: 5 }, (_, i) => `${roundedMin + i * step}-${roundedMin + (i + 1) * step}`);
          setFilters((prev) => ({ ...prev, salaryRanges }));
        }

        setFilters((prev) => ({ ...prev, jobTypes, employmentTypes, locations, skills }));
      })
      .catch((error) => console.error("Error fetching job data:", error));

    fetch("http://localhost:5000/jhire/companies")
      .then((response) => response.json())
      .then((data) => {
        console.log("Company API Response:", data); // Debugging step

        if (!data || !Array.isArray(data.companies)) {
          throw new Error("Expected an array but received: " + JSON.stringify(data));
        }

        const companies = data.companies.map((company) => company.company_name).sort();
        setFilters((prev) => ({ ...prev, companies }));
      })
      .catch((error) => console.error("Error fetching company data:", error));
  }, []);

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const updatedFilter = prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: updatedFilter };
    });
  };

  const handleToggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // ✅ Reset filters and collapse all sections
  const handleResetFilters = () => {
    setSelectedFilters({
      jobTypes: [],
      employmentTypes: [],
      locations: [],
      companies: [],
      salaryRanges: [],
      skills: [],
    });

    setOpenSections({
      jobTypes: false,
      employmentTypes: false,
      locations: false,
      companies: false,
      salaryRanges: false,
      skills: false,
    });

    onResetFilters(); // Call parent reset function if needed
  };

  return (
    <div className="p-6 border rounded-md shadow-md w-full bg-white">
      <h2 className="text-lg font-bold mb-4 text-center">Filters</h2>
      {Object.keys(filters).map((key) => (
        <div key={key} className="mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggleSection(key)}>
            <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
            <span className="text-lg font-bold">{openSections[key] ? "-" : "+"}</span>
          </div>
          {openSections[key] && (
            <div className="mt-2 space-y-1">
              {filters[key].map((value) => (
                <label key={value} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedFilters[key].includes(value)}
                    onChange={() => handleCheckboxChange(key, value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="mt-4 flex justify-between">
        <button onClick={() => onApplyFilters(selectedFilters)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Apply Filters
        </button>
        <button onClick={handleResetFilters} className="px-4 py-2 bg-gray-500 text-white rounded">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

// ✅ Define PropTypes to fix the warning
JobFiltering.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
};

export default JobFiltering;

