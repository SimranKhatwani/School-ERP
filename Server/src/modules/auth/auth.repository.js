import User from "../user/user.model.js";

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

const findUserWithPassword = async (id) => {
  return await User.findById(id);
};

const updatePassword = async (id, password) => {
  return await User.findByIdAndUpdate(
    id,
    { password },
    { new: true }
  );
};

const createUser = async (userData) => {
  return await User.create(userData);
};

export default {
  findUserByEmail,
  findUserById,
    findUserWithPassword,
  createUser,
    updatePassword,
};