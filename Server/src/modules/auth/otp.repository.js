import OTP from "./otp.model.js";

const createOTP = async (otpData) => {
  return await OTP.create(otpData);
};

const findOTPByUser = async (userId) => {
  return await OTP.findOne({ user: userId });
};

const deleteOTP = async (otpId) => {
  return await OTP.findByIdAndDelete(otpId);
};

const deleteExistingOTP = async (userId) => {
  return await OTP.deleteMany({ user: userId });
};

export default {
  createOTP,
  findOTPByUser,
  deleteOTP,
  deleteExistingOTP,
};
