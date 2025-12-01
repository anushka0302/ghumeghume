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

// 2. Verify Payment (Full Debug + Save Version)
// 2. Verify Payment
const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;

    console.log("--- DEBUG PAYMENT VERIFICATION ---");
    // Check if any required field is missing
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
       return res.status(400).json({ success: false, message: "Missing Razorpay fields" });
    }

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
             phone: String(bookingDetails.phone),
             guestSize: Number(bookingDetails.guestSize),
             
             // ✅ FIXED: Save as String directly (No 'new Date()' conversion)
             bookAt: bookingDetails.bookAt,
             
             totalAmount: Number(bookingDetails.totalAmount),
             paidAmount: Number(bookingDetails.paidAmount),
             dueAmount: Number(bookingDetails.dueAmount),
             currency: bookingDetails.currency || 'INR', 
             paymentStatus: bookingDetails.paymentStatus || "Partial",
             transactionId: razorpay_payment_id
           });

           await newBooking.save();
           console.log("✅ Booking saved successfully");
        }

        return res.status(200).json({
          success: true,
          message: "Payment successful",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        });

      } catch (dbError) {
        console.error("❌ DATABASE SAVE FAILED:", dbError);
        return res.status(500).json({ success: false, message: "Payment successful but Booking Save Failed" });
      }

    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Payment verification failed.",
      });
    }

  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { checkout, paymentVerification };