import RefreshToken from "./refreshToken.model.js";

const createRefreshToken = async (data) => {
  return await RefreshToken.create(data);
};

const findRefreshToken = async (token) => {
  return await RefreshToken.findOne({ token });
};

const deleteRefreshToken = async (token) => {
  return await RefreshToken.findOneAndDelete({ token });
};

const deleteAllUserTokens = async (userId) => {
  return await RefreshToken.deleteMany({
    user: userId,
  });
};



export default {
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
 deleteAllUserTokens,
};