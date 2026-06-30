import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "5m" }, // TTL index
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
