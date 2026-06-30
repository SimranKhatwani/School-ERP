import authRepository from "./auth.repository.js";
import refreshTokenRepository from "./refreshToken.repository.js";
import otpRepository from "./otp.repository.js";

import hashPassword from "../../utils/hashPassword.js";
import comparePassword from "../../utils/comparePassword.js";
import generateToken from "../../utils/generateToken.js";
import generateRefreshToken from "../../utils/generateRefreshToken.js";
import generateOTP from "../../utils/generateOTP.js";

// REGISTER 

const register = async (userData) => {
  const existingUser = await authRepository.findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  userData.password = await hashPassword(userData.password);

  const user = await authRepository.createUser(userData);

  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save Refresh Token
  await refreshTokenRepository.createRefreshToken({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// LOGIN

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save Refresh Token
  await refreshTokenRepository.createRefreshToken({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// GET CURRENT USER 

const getCurrentUser = async (userId) => {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

//  CHANGE PASSWORD 

const changePassword = async (
  userId,
  oldPassword,
  newPassword
) => {
  const user = await authRepository.findUserWithPassword(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(
    oldPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  const hashedPassword = await hashPassword(newPassword);

  await authRepository.updatePassword(
    userId,
    hashedPassword
  );
};

// REFRESH ACCESS TOKEN 
const refreshAccessToken = async (refreshToken) => {
  // Check if refresh token exists
  const storedToken =
    await refreshTokenRepository.findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new Error("Invalid Refresh Token");
  }

  // Verify JWT
  let decoded;

  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
  } catch (error) {
    throw new Error("Refresh Token Expired or Invalid");
  }

  // Delete old refresh token
  await refreshTokenRepository.deleteRefreshToken(refreshToken);

  // Generate new tokens
  const accessToken = generateToken(decoded.id);

  const newRefreshToken =
    generateRefreshToken(decoded.id);

  // Save new refresh token
  await refreshTokenRepository.createRefreshToken({
    user: decoded.id,
    token: newRefreshToken,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};


//  LOGOUT

const logout = async (refreshToken) => {
  await refreshTokenRepository.deleteRefreshToken(refreshToken);
};

const logoutAllDevices = async (userId) => {
  await refreshTokenRepository.deleteAllUserTokens(userId);
};



// OTP LOGIN
const sendOTP = async (email) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  await otpRepository.deleteExistingOTP(user._id);

  const otp = generateOTP();
  const hashedOTP = await hashPassword(otp);

  await otpRepository.createOTP({
    user: user._id,
    otp: hashedOTP,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  });

  return process.env.NODE_ENV === "development" ? { otp } : null;
};

const verifyOTP = async (email, otp) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const otpRecord = await otpRepository.findOTPByUser(user._id);

  if (!otpRecord) {
    throw new Error("OTP Expired or Invalid");
  }

  const isMatch = await comparePassword(otp, otpRecord.otp);

  if (!isMatch) {
    throw new Error("Invalid OTP");
  }

  await otpRepository.deleteOTP(otpRecord._id);

  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save Refresh Token
  await refreshTokenRepository.createRefreshToken({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export default {
  register,
  login,
  getCurrentUser,
  changePassword,
  refreshAccessToken,
  logout,
  logoutAllDevices,
  sendOTP,
  verifyOTP,
};