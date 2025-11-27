const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking'); 

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// 1. Create Order
const checkout = async (req, res) => {
  try {
    // ✅ UPDATED: Extract currency from request body
    const { amount, currency } = req.body;

    const options = {
      amount: Number(amount * 100), // Convert to smallest unit (Paise for INR, Cents for USD)
      currency: currency || "INR",  // ✅ UPDATED: Use dynamic currency or default to INR
    };
    
    const order = await instance.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: "Payment initiation failed",
      error: error.message
    });
  }
};

// 2. Verify Payment
const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
       if (bookingDetails) {
          const newBooking = new Booking({
            userId: bookingDetails.userId,
            userEmail: bookingDetails.userEmail,
            tourName: bookingDetails.tourName,
            fullName: bookingDetails.fullName,
            phone: bookingDetails.phone,
            guestSize: bookingDetails.guestSize,
            bookAt: bookingDetails.bookAt,
            
            // ✅ UPDATED: Save the financial details sent from frontend
            totalAmount: bookingDetails.totalAmount,
            paidAmount: bookingDetails.paidAmount,
            dueAmount: bookingDetails.dueAmount,
            currency: bookingDetails.currency || 'INR', // Save the currency
            paymentStatus: bookingDetails.paymentStatus || "Partial",
            
            transactionId: razorpay_payment_id
          });

          await newBooking.save();
       }

      res.status(200).json({
        success: true,
        message: "Payment successful",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
    } catch (dbError) {
      console.error("Failed to save booking:", dbError);
      return res.status(500).json({ success: false, message: "Payment successful but Booking Save Failed" });
    }

  } else {
    res.status(400).json({
      success: false,
      message: "Invalid signature. Payment verification failed.",
    });
  }
};

module.exports = { checkout, paymentVerification };