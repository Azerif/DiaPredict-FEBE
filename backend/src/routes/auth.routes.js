const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

// Forgot Password routes
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/verify-reset-code', AuthController.verifyResetCode);
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;