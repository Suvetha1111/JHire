const supabase = require("../config/connectDb");

const updateHrProfile = async (req, res) => {
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
        hr_linkedin_profile,
        role,
        department,
        hr_photo // Frontend should send image URL directly
    } = req.body;

    console.log(req.body);

    try {
        //  Check if HR exists
        const { data: existingHr, error: hrError } = await supabase
            .from("hr_table")
            .select("hr_id, hr_photo")
            .eq("hr_id", id)
            .single();

        if (hrError || !existingHr) {
            return res.status(404).json({ message: "HR not found" });
        }

        const formattedSkills = typeof skills === "string" ? skills.split(",").map(skill => skill.trim()) : skills;

        // Update HR Profile
        const { data: updatedHr, error: updateError } = await supabase
            .from("hr_table")
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
                hr_linkedin_profile,
                role,
                department,
                hr_photo: hr_photo || existingHr.hr_photo // Keep old image if no new URL is provided
            })
            .eq("hr_id", id)
            .select("*");

        if (updateError) {
            console.error("Error updating HR profile:", updateError);
            return res.status(500).json({ error: "Error updating HR profile", details: updateError.message });
        }

        return res.status(200).json({ message: "Profile updated successfully", hr: updatedHr });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

module.exports = { updateHrProfile };
