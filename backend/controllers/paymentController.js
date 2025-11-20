const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking'); // Import your Booking model

// Initialize Razorpay
// These come from your backend .env file
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// 1. Create Order
const checkout = async (req, res) => {
  try {
    // req.body.amount should be the 35% advance amount calculated on the frontend
    const options = {
      amount: Number(req.body.amount * 100), // Amount in smallest currency unit (paise)
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Payment initiation failed",
      error: error.message
    });
  }
};

// 2. Verify Payment
const paymentVerification = async (req, res) => {
  // Extract bookingDetails along with payment info
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // 1. Verify the signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // 2. Signature is valid. Now save the booking to DB.
    
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
            
            // PAYMENT DETAILS
            totalAmount: bookingDetails.totalAmount,
            paidAmount: bookingDetails.paidAmount, // The 35% Advance
            dueAmount: bookingDetails.dueAmount,   // The remaining 65%
            paymentStatus: "Partial", // Explicitly marked as Partial
            
            // Razorpay identifiers
            transactionId: razorpay_payment_id
          });

          await newBooking.save();
       }

      // 3. Send success response
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