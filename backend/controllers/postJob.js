const supabase = require("../config/connectDb"); // Import Supabase client

const postJob = async (req, res) => {
  try {
    const { id: hr_id, userType, company_id } = req.user;
    console.log(req.body);
    if (userType !== "hr") {
      return res.status(403).json({ error: "Only HRs can post jobs" });
    }

    // Extract job details from request body
    const {
      job_title,
      role,
      number_of_vacancies,
      skills, // Expecting an array
      job_description,
      job_type,
      salary,
      employment_type,
      job_location,
    } = req.body;

    if (!job_title || !role || !job_type || !employment_type) {
      return res.status(400).json({ error: "Missing required job fields" });
    }

    const { data, error } = await supabase
      .from("jobs_table")
      .insert([
        {
          hr_id,
          company_id, // Automatically added from JWT
          job_title,
          role,
          number_of_vacancies,
          skills, // Must be an array (ensure frontend sends it as an array)
          job_description,
          job_type,
          salary,
          employment_type,
          job_location,
        },
      ])
      .select(); // Return inserted job data

    if (error) {
      console.error("Error inserting job:", error.message);
      return res.status(500).json({ error: "Failed to post job" });
    }

    return res.status(201).json({ message: "Job posted successfully", job: data });
  } catch (err) {
    console.error("Server error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { postJob };
