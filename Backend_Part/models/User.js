const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      default: null
    },

    googleId: {
      type: String,
      default: null
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    // 🔹 PLAN SYSTEM
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free"
    },

    credits: {
      type: Number,
      default: 20 // free users get 20 daily
    },

    billingRenewal: {
      type: Date,
      default: null
    },

    teamSize: {
      type: Number,
      default: 1
    },

    // 🔹 PASSWORD RESET
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    resetOTP: String,
    resetOTPExpire: Date,
    resetOTPAttempts: {
      type: Number,
      default: 0
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
