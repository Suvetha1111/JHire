const supabase = require('../config/connectDb');

const getAllJobs = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('jobs_table')
            .select('*, company_table!inner(*)'); // LEFT JOIN with companies_table

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ jobs: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('jobs_table')
            .select('*, company_table!inner(*)') // LEFT JOIN with companies_table
            .eq('job_id', id)
            .single();

        if (error) return res.status(400).json({ error: error.message });
        if (!data) return res.status(404).json({ error: "Job not found" });

        res.status(200).json({ job: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllJobs, getJobById };
