const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true
    },
    phone: {
      type: Number, // Recommendation: Change to String in future to handle '+' codes
      required: true
    },
    bookAt: {
      type: Date,
      required: true
    },
    
    // ✅ NEW: Payment Fields added
    totalAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    dueAmount: {
        type: Number,
        required: true
    },
    currency: {
        type: String, // 'INR' or 'USD'
        default: 'INR'
    },
    paymentStatus: {
        type: String, 
        default: 'Pending'
    },
    transactionId: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);