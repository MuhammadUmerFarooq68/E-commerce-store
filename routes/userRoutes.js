const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passwordController = require('../controllers/passwordController');
router.post('/signup', userController.createUser);
router.post('/login', authController.login);
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password', passwordController.resetPassword);

module.exports = router;
