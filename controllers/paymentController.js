const paymentService = require('../services/paymentService');

// Controller for creating payment intent
const createPaymentIntent = async (req, res) => {
    const { amount } = req.body; // Amount in cents

    try {
        const { clientSecret, paymentIntentId } = await paymentService.createPaymentIntent(amount);
        res.json({ clientSecret, paymentIntentId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// confirm payment
const confirmPaymentIntent = async (req, res) => {
    const { paymentIntentId, paymentMethodId } = req.body;

    try {
        const paymentIntent = await paymentService.confirmPaymentIntent(paymentIntentId, paymentMethodId);
        res.json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controller for handling payment success

const handlePaymentSuccess = async (req, res) => {
    const { paymentIntentId, amount } = req.body;

    try {
        const message = await paymentService.handlePaymentSuccess(paymentIntentId, amount);
        res.json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { createPaymentIntent, handlePaymentSuccess,confirmPaymentIntent };
