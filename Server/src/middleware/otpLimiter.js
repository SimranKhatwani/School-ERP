import rateLimit from "express-rate-limit";

// Allow 3 OTP requests per 5 minutes
export const sendOtpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3,
  message: {
    success: false,
    message: "Too many OTP requests. Please try again after 5 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Allow 5 verification attempts per 5 minutes
export const verifyOtpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many verification attempts. Please try again after 5 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
