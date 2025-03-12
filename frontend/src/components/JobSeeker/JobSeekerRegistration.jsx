import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
const API_BASE_URL=import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";
const JobSeekerRegistration = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "first_name" || name === "last_name") {
      if (!value.trim()) error = "This field is required";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[\w.-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i.test(value))
        error = "Email must be Gmail, Yahoo, or Outlook";
    }

    if (name === "phone_number") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^[1-9]\d{9}$/.test(value))
        error = "Enter a valid 10-digit phone number (not starting with 0)";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6) error = "Password must be at least 6 characters";
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm your password";
      else if (value !== formData.password) error = "Passwords do not match";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) validateField(name, value); // Validate in real-time
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value); // Validate when field loses focus
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/seeker/register`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email.toLowerCase(),
        phone_number: formData.phone_number,
        password: formData.password,
      });

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrors({ general: "Registration failed. Try again." },err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-200 px-4">
      <div className="bg-green-50 p-6 rounded-lg shadow-lg w-full max-w-4xl flex">

<div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 to-green-500 text-white p-10 flex-col justify-center items-center rounded-l-lg">
          <img src="logo.avif" alt="Logo" className="w-32 h-32 mb-4 rounded-full shadow-lg" />
          <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
          <p className="text-center mt-4 px-4">Join our job-seeking platform and find the perfect career opportunities.</p>
          <button onClick={() => navigate("/hr-register")} className="mt-4 w-full bg-white text-green-700 font-semibold py-2 rounded-lg hover:bg-green-100">Register as Recruiter</button>
        </div>


      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Job Seeker Registration</h2>
        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={<FaUser />} name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} onBlur={handleBlur} error={errors.first_name} />
          <InputField icon={<FaUser />} name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} onBlur={handleBlur} error={errors.last_name} />
          <InputField icon={<FaEnvelope />} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} />
          <InputField icon={<FaPhone />} name="phone_number" type="text" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} onBlur={handleBlur} error={errors.phone_number} />
          
          <PasswordInput name="password" placeholder="Password" value={formData.password} onChange={handleChange} onBlur={handleBlur} showPassword={showPassword} setShowPassword={setShowPassword} error={errors.password} />
          <PasswordInput name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} error={errors.confirmPassword} />

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Register</button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account? <Link to='/login' className="text-green-600 font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-700">Registration Successful!</h2>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ icon, name, type = "text", placeholder, value, onChange, onBlur, error }) => (
  <div>
    <div className="flex items-center border rounded-lg px-3 py-2">
      {icon}
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} className="w-full pl-2 outline-none" />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PasswordInput = ({ name, placeholder, value, onChange, onBlur, showPassword, setShowPassword, error }) => (
  <div>
    <div className="flex items-center border rounded-lg px-3 py-2 relative">
      <FaLock className="text-gray-500" />
      <input type={showPassword ? "text" : "password"} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} className="w-full pl-2 outline-none" />
      <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-3">
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default JobSeekerRegistration;
