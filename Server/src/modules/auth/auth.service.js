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

export default {
  register,
  login,
};