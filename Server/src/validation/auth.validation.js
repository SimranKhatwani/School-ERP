import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10).max(15),
  role: z.string(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(6),
});

export const sendOtpSchema = z.object({
  email: z.email("Invalid email"),
});

export const verifyOtpSchema = z.object({
  email: z.email("Invalid email"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});