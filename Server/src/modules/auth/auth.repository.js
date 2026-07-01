import User from "../user/user.model.js";

const findUserByEmail = async (email, tenantId) => {
    return await User.findOne({
        email,
        tenant: tenantId,
    });
};

const findUserById = async (id, tenantId) => {
    return await User.findOne({
        _id: id,
        tenant: tenantId,
    }).select("-password");
};

const findUserWithPassword = async (
    id,
    tenantId
) => {
    return await User.findOne({
        _id: id,
        tenant: tenantId,
    });
};

const updatePassword = async (id, password, tenantId) => {
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
  updatePassword,
  createUser,
};