const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passwordController = require('../controllers/passwordController');
const productController = require('../controllers/productController');
const paymentController = require('../controllers/paymentController');
const reviewController = require('../controllers/reviewController');

router.post('/signup', userController.createUser);
router.post('/login', authController.login);
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password', passwordController.resetPassword);

router.get('/getproducts', productController.getAllProducts);
router.get('/getproducts/:id', productController.getProductById);
router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/confirm-payment-intent', paymentController.confirmPaymentIntent);
router.post('/payment-success', paymentController.handlePaymentSuccess);

router.get('/allreview', reviewController.getAllReviews);
router.get('/reviewbyid/:id', reviewController.getReviewById);
router.post('/createreview', reviewController.createReview);
router.put('/updatingreviews/:id', reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;
