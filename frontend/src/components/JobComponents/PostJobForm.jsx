import { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const PostJobForm = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    jobTitle: "",
    role: "",
    numberOfVacancies: "",
    skills: "",
    jobDescription: "",
    jobType: "Remote",
    employmentType: "Full-time",
    salary: "",
    jobLocation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("You must be logged in as an HR to post a job.");
      return;
    }

    const jobData = {
      hr_id: user.id,
      company_id: user.company_id,
      job_title: formData.jobTitle,
      role: formData.role,
      number_of_vacancies: parseInt(formData.numberOfVacancies, 10),
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      job_description: formData.jobDescription,
      job_type: formData.jobType,
      employment_type: formData.employmentType,
      salary: formData.salary,
      job_location: formData.jobLocation,
    };

    try {
      await axios.post(`${API_BASE_URL}/jobs`, jobData, { withCredentials: true });
      toast.success("Job posted successfully!");

      setFormData({
        jobTitle: "",
        role: "",
        numberOfVacancies: "",
        skills: "",
        jobDescription: "",
        jobType: "Remote",
        employmentType: "Full-time",
        salary: "",
        jobLocation: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 flex  flex-col items-center">
      {/* Quote Section */}
      <div className="w-full max-w-2xl text-center mb-6">
        <marquee behavior="scroll" direction="right">
        <blockquote className="text-lg italic text-green-700">
          &quot;Great HR professionals don&apos;t just fill positions; they build careers and change lives.&quot;
        </blockquote>
        </marquee>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/3">
          <img src="home_1.png" alt="Job Posting" className="rounded-lg shadow-md w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
            Post A Job To Help The Job Seekers
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            {/* Job Title */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Job Title *</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Role */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Role *</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} required className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Job Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Job Description *</label>
              <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} required className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500" rows="4" />
            </div>

            {/* Number of Vacancies */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Number of Vacancies *</label>
              <input type="number" name="numberOfVacancies" value={formData.numberOfVacancies} onChange={handleChange} required className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Skills */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Skills (comma separated) *</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} required className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Job Type */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Job Type *</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange} className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Employment Type */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Employment Type *</label>
              <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Salary */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Salary *</label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} required className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Job Location */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Job Location *</label>
              <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} required className="mt-1 p-2 w-full border border-green-400 rounded-md focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-center">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 w-full sm:w-auto">
                Post Job
              </button>
            </div>
          </form>

          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
