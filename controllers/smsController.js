const sendSms = require('../services/smsService');

const sendSmsController = async (req, res) => {
    const { to, body } = req.body;
    const result = await sendSms(to, body);

    if (result.success) {
        res.status(200).json({ message: 'SMS sent successfully!', messageSid: result.message.sid });
    } else {
        res.status(500).json({ message: 'Failed to send SMS', error: result.error });
    }
};

module.exports = {
    sendSmsController
};
