const express = require('express');
const { 
  checkout, 
  paymentVerification 
} = require('../controllers/paymentController.js');

const router = express.Router();

// This route creates the Razorpay order
router.post('/checkout', checkout);

// This route verifies the payment signature
router.post('/paymentverification', paymentVerification);

module.exports = router;