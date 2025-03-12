const supabase = require('../config/connectDb');
const { sendApplicationStatusEmail } = require('../services/emailService');

const updateApplicationStatus = async (req, res) => {
    const { application_status } = req.body;
    const { application_id } = req.params;

    try {
        // Fetch application details including HR and Seeker ID
        const { data: application, error: applicationError } = await supabase
            .from('applied_jobs')
            .select('seeker_id, hr_id')
            .eq('application_id', application_id)
            .single();

        if (applicationError || !application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Fetch HR email
        const { data: hr, error: hrError } = await supabase
            .from('hr_table')
            .select('email, first_name')
            .eq('hr_id', application.hr_id)
            .single();

        if (hrError || !hr) {
            return res.status(404).json({ error: 'HR not found' });
        }

        // Fetch Seeker email
        const { data: seeker, error: seekerError } = await supabase
            .from('seeker_table')
            .select('email, first_name')
            .eq('seeker_id', application.seeker_id)
            .single();

        if (seekerError || !seeker) {
            return res.status(404).json({ error: 'Seeker not found' });
        }

        // Update application status in database
        const { data, error } = await supabase
            .from('applied_jobs')
            .update({ application_status })
            .eq('application_id', application_id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Send email notification
        const emailResponse = await sendApplicationStatusEmail(hr.email, hr.first_name, seeker.email, seeker.first_name, application_status);

        if (!emailResponse.success) {
            return res.status(500).json({ message: 'Application updated, but email sending failed', error: emailResponse.error });
        }

        res.status(200).json({ message: 'Application status updated and email sent successfully', data });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = { updateApplicationStatus };
