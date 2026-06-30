import crypto from "crypto";

const generateOTP = () => {
  // Generate a random number between 100000 and 999999
  const otp = crypto.randomInt(100000, 999999);
  return otp.toString();
};

export default generateOTP;
