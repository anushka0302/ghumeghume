const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    prize: { type: String },
    source: { type: String, default: "Spin Wheel" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);