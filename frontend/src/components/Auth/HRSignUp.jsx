import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const HRSignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
  });

  const [companyExists, setCompanyExists] = useState(true);
  const [companyData, setCompanyData] = useState({
    company_name: "",
    company_website: "",
    company_location_city: "",
    company_location_country: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "first_name":
      case "last_name":
        if (!value.trim()) error = "This field is required";
        break;

      case "email":
        if (!value.includes("@") || !/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
        break;

      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;

      case "phone_number":
        if (!/^\d{10}$/.test(value)) error = "Enter a valid 10-digit phone number";
        break;

      case "role":
        if (!value.trim()) error = "This field is required";
        break;

      case "company_name":
      case "company_website":
      case "company_location_city":
      case "company_location_country":
        if (!value.trim()) error = "This field is required";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
    validateField(name, value);
  };

  const checkCompany = async () => {
    if (!formData.email.includes("@")) return;
    const emailDomain = formData.email.split("@")[1];
    try {
      const res = await axios.get(`${API_BASE_URL}/hr/company/check/${emailDomain}`);
      setCompanyExists(res.data.exists);
    } catch (error) {
      setErrorMessage("Error checking company existence.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setErrorMessage("");
    setSuccessMessage("");

    // Final validation before submission
    let newErrors = {};
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    if (!companyExists) Object.keys(companyData).forEach((key) => validateField(key, companyData[key]));
    if (Object.values(errors).some((error) => error)) return;

    try {
      if (!companyExists) {
        await axios.post(`${API_BASE_URL}/hr/register/company`, { ...companyData, hr_email: formData.email });
      }
      await axios.post(`${API_BASE_URL}/hr/register/hr`, formData);
      setSuccessMessage(companyExists ? "HR Registered Successfully" : "Company & HR Registered Successfully");

      setFormData({ first_name: "", last_name: "", email: "", password: "", phone_number: "", role: "" });
      setCompanyData({ company_name: "", company_website: "", company_location_city: "", company_location_country: "" });
      setCompanyExists(true);

      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error registering.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-xl  bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">HR Registration</h2>
          {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-gray-700">
                  <i className="fas fa-user mr-2"></i> First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}
              </div>
              <div>
                <label className="flex items-center text-gray-700">
                  <i className="fas fa-user mr-2"></i> Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}
              </div>
            </div>
            <div>
              <label className="flex items-center text-gray-700">
                <i className="fas fa-envelope mr-2"></i> Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onBlur={checkCompany}
                onChange={handleChange}
                className="input-field"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <label className="flex items-center text-gray-700">
                <i className="fas fa-lock mr-2"></i> Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="input-field"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-gray-700">
                  <i className="fas fa-phone-alt mr-2"></i> Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number}</p>}
              </div>
              <div>
                <label className="flex items-center text-gray-700">
                  <i className="fas fa-briefcase mr-2"></i> Role
                </label>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
              </div>
            </div>

          </form>
          
          {!companyExists && (
              <div className="flex justify-between bg-green-50 p-4 rounded-md shadow-sm">
                <div className="w-1/2">
                  <h2 className="text-lg font-medium text-green-700 mb-2">Company Not Found! Register Below</h2>
                  {Object.keys(companyData).map((key) => (
                    <div key={key}>
                      <label className="flex items-center text-gray-700">
                        <i className="fas fa-building mr-2"></i> {key.replace("_", " ")}
                      </label>
                      <input
                        type="text"
                        name={key}
                        placeholder={key.replace("_", " ")}
                        onChange={handleCompanyChange}
                        className="input-field"
                      />
                      {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md text-lg hover:bg-green-700 transition"
            >
              {companyExists ? "Register HR" : "Register Company & HR"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default HRSignUp;
