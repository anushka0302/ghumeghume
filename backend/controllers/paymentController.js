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
const paymentVerification = async (req, res) => {
  try {
    // ---------------------------------------------------------
    // STEP A: Log Incoming Data to Console (For Debugging)
    // ---------------------------------------------------------
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;

    console.log("--- DEBUG PAYMENT VERIFICATION ---");
    console.log("Received Order ID:", razorpay_order_id);
    console.log("Received Payment ID:", razorpay_payment_id);
    console.log("Received Signature:", razorpay_signature);
    // console.log("Booking Details:", bookingDetails); // Uncomment if needed

    // Check if any required field is missing
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
       console.error("ERROR: Missing required Razorpay fields in req.body");
       return res.status(400).json({ success: false, message: "Missing Razorpay fields in request" });
    }

    // ---------------------------------------------------------
    // STEP B: Verify Signature
    // ---------------------------------------------------------
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("Expected Signature (Backend):", expectedSignature);
    console.log("Received Signature (Frontend):", razorpay_signature);
    
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // ---------------------------------------------------------
      // STEP C: Save to Database (Your Original Logic)
      // ---------------------------------------------------------
      try {
        if (bookingDetails) {
           const newBooking = new Booking({
             userId: bookingDetails.userId,
             userEmail: bookingDetails.userEmail,
             tourName: bookingDetails.tourName,
             fullName: bookingDetails.fullName,
             
             // ✅ SAFETY: Convert phone to String explicitly
             phone: String(bookingDetails.phone),
             
             // ✅ SAFETY: Force conversion to Number
             guestSize: Number(bookingDetails.guestSize),
             
             // ✅ SAFETY: Ensure Date is a proper object
             bookAt: new Date(bookingDetails.bookAt),
             
             // ✅ SAFETY: Ensure Amounts are Numbers
             totalAmount: Number(bookingDetails.totalAmount),
             paidAmount: Number(bookingDetails.paidAmount),
             dueAmount: Number(bookingDetails.dueAmount),
             
             currency: bookingDetails.currency || 'INR', 
             paymentStatus: bookingDetails.paymentStatus || "Partial",
             transactionId: razorpay_payment_id
           });

           await newBooking.save();
           console.log("✅ Booking saved successfully to Database");
        }

        return res.status(200).json({
          success: true,
          message: "Payment successful",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        });

      } catch (dbError) {
        console.error("❌ Payment Verified, but Booking Save Failed:", dbError);
        return res.status(500).json({ 
            success: false, 
            message: "Payment successful but Booking Save Failed" 
        });
      }

    } else {
      // ---------------------------------------------------------
      // Signature Mismatch
      // ---------------------------------------------------------
      console.warn("❌ Signature Mismatch! Verification Failed.");
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Payment verification failed.",
      });
    }

  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return res.status(500).json({ 
        success: false, 
        message: "Internal Server Error during verification" 
    });
  }
};

module.exports = { checkout, paymentVerification };