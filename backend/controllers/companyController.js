const supabase = require('../config/connectDb');

const getAllCompanies = async (req, res) => {
    try {
        const { data: companies, error } = await supabase
            .from('company_table')
            .select('*');

        if (error) throw error;

        return res.status(200).json({ companies });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

// Get company by ID
const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('company_table')
            .select('*')
            .eq('company_id', id);

        if (error) throw error;
        if (!data || data.length === 0) return res.status(404).json({ message: 'Company not found' });

        return res.status(200).json(data[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

module.exports = { getAllCompanies, getCompanyById };