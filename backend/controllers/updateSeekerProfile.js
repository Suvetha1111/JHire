const supabase = require("../config/connectDb");
const updateSeekerProfile = async (req, res) => {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        phone_number,
        age,
        gender,
        about_me,
        university_name,
        degree_name,
        specialization,
        years_of_experience,
        skills,
        seeker_linkedin_profile,
        resume,
        profile_url
    } = req.body;

    console.log("Received update request:", req.body); // Log incoming request data

    try {
        // Check if the seeker exists
        const { data: existingSeeker, error: seekerError } = await supabase
            .from("seeker_table")
            .select("seeker_id, profile_url")
            .eq("seeker_id", id)
            .single();

        if (seekerError || !existingSeeker) {
            console.error("Seeker not found:", seekerError);
            return res.status(404).json({ message: "Seeker not found" });
        }

        // Convert `skills` to an array if needed
        const formattedSkills = typeof skills === "string" ? skills.split(",").map(skill => skill.trim()) : skills;

        // Update Seeker Profile
        const { data: updatedSeeker, error: updateError } = await supabase
            .from("seeker_table")
            .update({
                first_name,
                last_name,
                phone_number,
                age,
                gender,
                about_me,
                university_name,
                degree_name,
                specialization,
                years_of_experience,
                skills: formattedSkills,
                seeker_linkedin_profile,
                resume: resume || existingSeeker.resume,
                profile_url: profile_url || existingSeeker.profile_url
            })
            .eq("seeker_id", id)
            .select("*");

        if (updateError) {
            console.error("Error updating seeker profile:", updateError);
            return res.status(500).json({ error: "Error updating seeker profile", details: updateError.message });
        }

        return res.status(200).json({ message: "Seeker profile updated successfully", seeker: updatedSeeker });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

module.exports = updateSeekerProfile;