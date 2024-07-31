require('dotenv').config()
const stripe = require('stripe')(process.env.STRIP_KEY);
const  Payment  = require('../models/payment');
// Create a payment intent with Stripe
const createPaymentIntent = async (amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        };
    } catch (error) {
        throw new Error(`Error creating payment intent: ${error.message}`);
    }
};
// Confirm a payment intent
const confirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId
        });

        return paymentIntent;
    } catch (error) {
        throw new Error(`Error confirming payment intent: ${error.message}`);
    }
};
// Handle payment success and save payment to the database
const handlePaymentSuccess = async (paymentIntentId, amount) => {
    try {
        // Retrieve the PaymentIntent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        console.log('PaymentIntent:', paymentIntent); // Debug log

        // Check if the PaymentIntent status is 'succeeded'
        if (paymentIntent.status === 'succeeded') {
            return 'Payment succeeded and saved to database';
        } else {
            throw new Error('Payment not succeeded');
        }
    } catch (error) {
        throw new Error(`Error handling payment success: ${error.message}`);
    }
};
module.exports = { createPaymentIntent, handlePaymentSuccess,confirmPaymentIntent };
