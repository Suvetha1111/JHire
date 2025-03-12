import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../SupabaseClient";
import { useUser } from "../../context/UserContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const SeekerProfileUpdate = () => {
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
    user_type: "seeker",
    university_name: "",
    college_name: "",
    specialization: "",
    degree_name: "",
    passing_year: "",
    grade_obtained: "",
    certification_list: "",
    years_of_experience: "",
    previous_company: "",
    previous_job_role: "",
    skills: "",
    seeker_linkedin_profile: "",
    city_name: "",
    country_name: "",
    pin_code: "",
    resume: "",
    profile_url: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    axios.get(`${API_BASE_URL}/seeker/${user.id}`)
      .then((response) => {
        if (!response.data || !Array.isArray(response.data.data) || response.data.data.length === 0) {
          console.error("Invalid response format or empty data", response.data);
          return;
        }

        const seekerData = response.data.data[0];

        setFormData((prev) => ({
          ...prev,
          ...seekerData,
          skills: Array.isArray(seekerData.skills) ? seekerData.skills.join(", ") : seekerData.skills || "",
        }));

        setImagePreview(seekerData.profile_url || "https://placehold.co/150");
      })
      .catch((error) => {
        console.error("Error fetching seeker profile:", error);
      });
  }, [user?.id]);

  // ✅ Universal function for handling both image & resume uploads
  const handleFileChange = async (e, fileType) => {
    const file = e.target.files[0];
    if (!file || !user) return;
  
    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop();
    const fileName = `${fileType}_${timestamp}.${fileExt}`;
    const filePath = `seeker_profiles/${user.email}/${fileName}`;
  
    // 🔥 Extract and Delete Old File if Exists
    if (formData[fileType]) {
      try {
        const oldFileUrl = new URL(formData[fileType]); // Convert to URL object
        const pathSegments = oldFileUrl.pathname.split("/");
  
        if (pathSegments.length >= 4) {
          const oldFilePath = pathSegments.slice(3).join("/"); // Extract after bucket
          console.log(`Deleting old file: ${oldFilePath}`);
  
          const { error: deleteError } = await supabase.storage
            .from("demoforuploadphotosandresumes")
            .remove([oldFilePath]);
  
          if (deleteError) {
            console.error(`Error deleting old ${fileType}:`, deleteError.message);
          } else {
            console.log(`✅ Successfully deleted old ${fileType}`);
          }
        }
      } catch (deleteError) {
        console.error("Failed to parse old file URL for deletion:", deleteError);
      }
    }
  
    // 🚀 Upload New File
    const { error } = await supabase.storage
      .from("demoforuploadphotosandresumes")
      .upload(filePath, file, { upsert: true });
  
    if (error) {
      console.error(`Upload error (${fileType}):`, error.message);
      return;
    }
  
    // 🎯 Get the new file URL
    const { data } = supabase.storage
      .from("demoforuploadphotosandresumes")
      .getPublicUrl(filePath);
  
    if (data && data.publicUrl) {
      const publicUrl = data.publicUrl;
      console.log(`New ${fileType} uploaded: ${publicUrl}`);
  
      try {
        // 🔄 Update the database with new URL
        await axios.put(`${API_BASE_URL}/seeker/update-profile/${user.id}`, {
          [fileType]: publicUrl,
        });
  
        // 🌟 Update local state
        setFormData((prev) => ({ ...prev, [fileType]: publicUrl }));
  
        if (fileType === "profile_url") {
          setImagePreview(publicUrl);
        }
      } catch (err) {
        console.error(`Error updating ${fileType} in database:`, err);
      }
    }
  };
  

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ?? "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const formattedSkills = Array.isArray(formData.skills)
      ? formData.skills
      : formData.skills.split(",").map((skill) => skill.trim());

    try {
      await axios.put(
        `${API_BASE_URL}/seeker/update-profile/${user.id}`,
        { ...formData, skills: formattedSkills },
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/seeker-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex gap-8">
      {/* Left Profile Section */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Hello, {formData.first_name && formData.last_name ? `${formData.first_name} ${formData.last_name}` : "Seeker"}!
        </h1>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src={imagePreview || "https://placehold.co/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Upload Profile Photo */}
        <label className="mt-4 text-gray-700 font-medium">Upload Profile Photo</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "profile_url")} className="mt-2" />

       

        <p className="text-gray-600 mt-2">{formData.email}</p>
      </div>

      {/* Right Form Section */}
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.keys(formData)
            .filter((name) => !["seeker_id", "password_hash", "is_job_seeker", "profile_url", "email","resume"].includes(name))
            .map((name) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium">{name.replace(/_/g, " ").toUpperCase()}</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            ))}
             {/* Upload Resume */}
        <label className="mt-4 text-gray-700 font-medium p-2 border-2">Upload Resume (PDF/DOC)</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, "resume")} className="mt-5 ml-3" />

        {/* Show Resume Link */}
        {formData.resume && (
          <p className="mt-2">
            <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              View Uploaded Resume
            </a>
          </p>
        )}
          <div className="col-span-2 flex justify-center mt-2">
            <button type="submit" className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeekerProfileUpdate;
