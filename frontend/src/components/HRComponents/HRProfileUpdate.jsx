import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../SupabaseClient";
import { useUser } from "../../context/UserContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const HRProfileUpdate = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    age: "",
    gender: "",
    about_me: "",
    university_name: "",
    degree_name: "",
    specialization: "",
    years_of_experience: "",
    skills: "", // Kept as a string for UI consistency
    hr_linkedin_profile: "",
    hr_photo: "",
    role: "",
    department: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  // Fetch HR Profile
  useEffect(() => {
    if (!user?.id) return;

    axios.get(`${API_BASE_URL}/hr/${user.id}`)
      .then((response) => {
        setFormData({
          ...response.data,
          skills: Array.isArray(response.data.skills) ? response.data.skills.join(", ") : response.data.skills || "",
          email: response.data.email || ""
        });
        setImagePreview(response.data.hr_photo || "");
      })
      .catch((error) => console.error("Error fetching HR profile:", error));
  }, [user?.id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ?? "",  // Prevent null values
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;
  
    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop();
    const fileName = `profile_${timestamp}.${fileExt}`;
    const filePath = `hr_profiles/${user.email}/${fileName}`;
  
    const { error } = await supabase.storage
      .from("demoforuploadphotosandresumes")
      .upload(filePath, file, { upsert: true });
  
    if (error) {
      console.error("Upload error:", error.message);
      return;
    }
  
    const { data } = supabase.storage
      .from("demoforuploadphotosandresumes")
      .getPublicUrl(filePath);
  
    if (data) {
      const publicUrl = data.publicUrl;
  
      // ✅ Send the URL to the backend
      try {
        await axios.put(`${API_BASE_URL}/hr/update-profile/${user.id}`, {
          hr_photo: publicUrl,
        });
  
        console.log("Profile image updated in database!");
        setFormData((prev) => ({ ...prev, hr_photo: publicUrl }));
        setImagePreview(publicUrl);
      } catch (err) {
        console.error("Error updating profile in database:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // ✅ Ensure skills is an array before sending to backend
    const formattedSkills = Array.isArray(formData.skills)
      ? formData.skills
      : formData.skills.split(",").map((skill) => skill.trim());

    try {
      await axios.put(
        `${API_BASE_URL}/hr/update-profile/${user.id}`,
        { ...formData, skills: formattedSkills },
        { headers: { "Content-Type": "application/json" } }
      );

      // navigate("/hr-dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-10 flex gap-8">
      {/* Left Profile Section */}
      <div className="w-1/3 bg-green p-6 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Hello, {`${formData.first_name} ${formData.last_name}`.trim() || "HR"}!
        </h1>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300">
          <img
            src={imagePreview || "https://placehold.co/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="mt-4 text-green-700 font-medium">Upload Photo</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
        <p className="text-green-600 bold text-2xl mt-2">{formData.email}</p>
        <div>
            <label className=" text-green-700  font-medium">First Name</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className=" text-green-700 font-medium">Last Name</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
      </div>

      {/* Right Form Section */}
      <div className="w-2/3 bg-green p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            { label: "Phone Number", name: "phone_number" },
            { label: "Age", name: "age" },
            { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
            { label: "University Name", name: "university_name" },
            { label: "Degree", name: "degree_name" },
            { label: "Specialization", name: "specialization" },
            { label: "Years of Experience", name: "years_of_experience" },
            { label: "Skills", name: "skills" },
            { label: "LinkedIn Profile", name: "hr_linkedin_profile" },
            { label: "Role", name: "role" },
            { label: "Department", name: "department" },
          ].map(({ label, name, type, options }) => (
            <div key={name}>
              <label className="block text-green-700 font-medium">{label}</label>
              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              )}
            </div>
          ))}

          {/* About Me Field */}
          <div className="col-span-2">
            <label className="block text-green-700 font-medium">About Me</label>
            <textarea
              name="about_me"
              value={formData.about_me || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg h-24 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRProfileUpdate;
