const nodemailer = require('nodemailer');
require('dotenv').config();

const sendApplicationStatusEmail = async (fromEmail, fromName, toEmail, seekerName, status) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: fromEmail, // HR's email as sender
                pass: process.env.EMAIL_PASS, // HR's email password (Use App Password if needed)
            },
        });

        const mailOptions = {
            from: `${fromName} <${fromEmail}>`, // Display HR's name
            to: toEmail, // Seeker's email
            subject: `Application Status Update - ${status}`,
            text: `Dear ${seekerName},\n\nYour job application status has been updated to: ${status}.\n\nBest Regards,\n${fromName} (HR)`
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${toEmail} successfully.`);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, message: 'Email sending failed', error: error.message };
    }
};

module.exports = { sendApplicationStatusEmail };
