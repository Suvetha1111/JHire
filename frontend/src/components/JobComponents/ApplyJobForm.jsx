import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Phone number is required"),
  linkedIn: yup.string().url("Invalid URL"),
  github: yup.string().url("Invalid URL"),
  resume: yup.mixed().required("Resume is required"),
  coverLetter: yup.string().required("Cover letter is required"),
  portfolio: yup.string().url("Invalid URL"),
});

const ApplyJobForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Application submitted successfully!");
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }} 
      className="fixed inset-0 flex items-center justify-center bg-green-50 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-700">Apply for Job</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input {...register("fullName")} className="w-full p-2 border border-green-400 rounded" placeholder="John Doe" />
                <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input {...register("email")} className="w-full p-2 border border-green-400 rounded" placeholder="john@example.com" />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input {...register("phone")} className="w-full p-2 border border-green-400 rounded" placeholder="9876543210" />
                <p className="text-red-500 text-sm">{errors.phone?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700">LinkedIn Profile</label>
                <input {...register("linkedIn")} className="w-full p-2 border border-green-400 rounded" placeholder="https://linkedin.com/in/yourprofile" />
                <p className="text-red-500 text-sm">{errors.linkedIn?.message}</p>
              </div>
            </div>
          </div>

          {/* Job Application Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Job Application Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">GitHub Profile</label>
                <input {...register("github")} className="w-full p-2 border border-green-400 rounded" placeholder="https://github.com/yourprofile" />
                <p className="text-red-500 text-sm">{errors.github?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700">Portfolio Website</label>
                <input {...register("portfolio")} className="w-full p-2 border border-green-400 rounded" placeholder="https://yourportfolio.com" />
                <p className="text-red-500 text-sm">{errors.portfolio?.message}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700">Resume (PDF)</label>
                <input type="file" {...register("resume")} className="w-full p-2 border border-green-400 rounded" />
                <p className="text-red-500 text-sm">{errors.resume?.message}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700">Cover Letter</label>
                <textarea {...register("coverLetter")} className="w-full p-2 border border-green-400 rounded h-20" placeholder="Why are you a good fit?" />
                <p className="text-red-500 text-sm">{errors.coverLetter?.message}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default ApplyJobForm;