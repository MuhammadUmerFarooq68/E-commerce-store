const client = require('../config/twilo');

const sendSms = async (to, body) => {
    const from = process.env.TWILIO_PHONE_NUMBER;
    
    if (!from) {
        console.error('Twilio phone number is not set in environment variables.');
        return { success: false, error: 'Twilio phone number is not set in environment variables.' };
    }

    try {
        const message = await client.messages.create({
            body,
            from,  // Ensure this is set correctly
            to,
        });
        return { success: true, message };
    } catch (error) {
        console.error('Error sending SMS:', error);
        return { success: false, error: error.message };
    }
};

module.exports = sendSms;
