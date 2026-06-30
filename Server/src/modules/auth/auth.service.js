import authRepository from "./auth.repository.js";
import hashPassword from "../../utils/hashPassword.js";
import comparePassword from "../../utils/comparePassword.js";
import generateToken from "../../utils/generateToken.js";

const register = async (userData) => {
  const existingUser = await authRepository.findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  userData.password = await hashPassword(userData.password);

  const user = await authRepository.createUser(userData);

  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};

//  GET CURRENT USER 

const getCurrentUser = async (userId) => {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// CHANGE PASSWORD 

const changePassword = async (
  userId,
  oldPassword,
  newPassword
) => {
  // Fetch user WITH password
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

export default {
  register,
  login,
  getCurrentUser,
  changePassword,
};