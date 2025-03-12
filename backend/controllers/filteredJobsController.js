const supabase = require("../config/connectDb");

const getFilteredJobs = async (req, res) => {
    try {
        const { location, category, experience, jobType, employmentType, salaryRange, skills } = req.query;

        let query = supabase.from("jobs_table").select("*, company_table!inner(*)");

        // Apply filters dynamically
        if (location) query = query.eq("location", location);
        if (category) query = query.eq("category", category);
        if (experience) query = query.gte("experience", experience);
        if (jobType) query = query.eq("jobType", jobType);
        if (employmentType) query = query.eq("employmentType", employmentType);
        if (salaryRange) query = query.eq("salaryRange", salaryRange);

        if (skills) {
            const skillsArray = skills.split(",");
            for (const skill of skillsArray) {
                query = query.contains("skills", [skill]); // Assuming 'skills' is an array column
            }
        }

        const { data, error } = await query;

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ jobs: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getFilteredJobs };

