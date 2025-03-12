const supabase = require('../config/connectDb');
const bcrypt = require("bcrypt");
// Helper function to extract email domain
const extractDomain = (email) => email.split("@")[1];

// HR Registration Controller
const registerHR = async (req, res) => {
    const { first_name, last_name, email, password, phone_number, role,  } = req.body;
    const emailDomain = extractDomain(email);

    try {
        // Check if HR already exists
        const { data: existingHr, error: hrError } = await supabase
            .from("hr_table")
            .select("hr_id")
            .eq("email", email);

        if (hrError) throw hrError;
        if (existingHr.length > 0) {
            return res.status(400).json({ message: "HR with this email already exists." });
        }

        // Check if company exists
        const { data: company, error: companyError } = await supabase
            .from("company_table")
            .select("company_id")
            .eq("company_email_domain", emailDomain);

        if (companyError) throw companyError;

        if (company.length === 0) {
            return res.status(400).json({ message: "Company not found. Please register the company first." });
        }

        // Company exists, assign HR to company
        const companyId = company[0].company_id;
        const hashedPassword = await bcrypt.hash(password, 10);
        email=email.toLowerCase();
        const { data: hr, error: hrInsertError } = await supabase
            .from("hr_table")
            .insert([{
                first_name,
                last_name,
                email,
                password_hash: hashedPassword,
                phone_number,
                role,
                company_id: companyId
            }])
            .select("hr_id, first_name, last_name, email, company_id");

        if (hrInsertError) throw hrInsertError;

        return res.status(201).json({ message: "HR registered successfully", hr });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Company Registration Controller
const registerCompany = async (req, res) => {
    const { company_name, company_website, company_location_city, company_location_country, hr_email } = req.body;
    const emailDomain = extractDomain(hr_email);

    try {
        // Check if domain already exists
        const { data: existingCompany, error: domainCheckError } = await supabase
            .from("company_table")
            .select("company_id")
            .eq("company_email_domain", emailDomain);

        if (domainCheckError) throw domainCheckError;

        if (existingCompany.length > 0) {
            return res.status(400).json({ message: "A company with this domain already exists." });
        }

        // Insert company
        const { data: newCompany, error: companyInsertError } = await supabase
            .from("company_table")
            .insert([{
                company_name,
                company_website,
                company_location_city,
                company_location_country,
                company_email_domain: emailDomain
            }])
            .select("company_id, company_name, company_email_domain");

        if (companyInsertError) throw companyInsertError;

        return res.status(201).json({ message: "Company registered successfully", company: newCompany });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Fetch all HRs
const getAllHrs = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('hr_table')
            .select('*');
        if (error) throw error;

        res.status(200).json({hrs:data});
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Get HR by ID
const getHrById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('hr_table')
            .select('*')
            .eq('hr_id', id);

        if (error) throw error;
        if (!data || data.length === 0) return res.status(404).json({ message: "HR not found" });

        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Get all jobs posted by a specific HR
const getJobsByHrId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('jobs_table')
            .select('*')
            .eq('hr_id', id);

        if (error) throw error;
        res.status(200).json({jobs: data});
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


// Check if company exists by email domain
const checkCompanyByDomain = async (req, res) => {
    const { domain } = req.params;

    try {
        const { data: company, error } = await supabase
            .from("company_table")
            .select("company_id")
            .eq("company_email_domain", domain);

        if (error) throw error;

        return res.status(200).json({ exists: company.length > 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch job details
        const { data: jobData, error: jobError } = await supabase
            .from("jobs_table")
            .select("*")
            .eq("job_id", id)
            .single();

        if (jobError) throw jobError;
        if (!jobData) return res.status(404).json({ message: "Job not found" });

        // Fetch applied candidates for the job
        const { data: applicants, error: applicantError } = await supabase
            .from("applied_jobs")
            .select(`
                application_id,
                applied_at,
                application_status,
                seeker_skills,
                seeker_resume,
                seeker_table (
                    seeker_id,
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    skills
                )
            `)
            .eq("job_id", id);

        if (applicantError) throw applicantError;

        // Return job details along with applied candidates
        res.status(200).json({
            job: jobData,
            applied_candidates: applicants || [],
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const getHrByCompanyId = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { data, error } = await supabase
            .from('hr_table')
            .select('*')
            .eq('company_id', companyId);

        if (error) throw error;
        // if (!data || data.length === 0) return res.status(404).json({ message: "HR not found" });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
}
module.exports = { checkCompanyByDomain, getAllHrs, getHrById, getJobsByHrId, registerHR, registerCompany ,getJobById,getHrByCompanyId};