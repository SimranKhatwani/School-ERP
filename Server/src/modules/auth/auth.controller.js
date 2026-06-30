import authService from "./auth.service.js";

const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user._id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await authService.logout(refreshToken);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutAllDevices = async (req, res) => {
  try {
    await authService.logoutAllDevices(req.user.id);

    res.status(200).json({
      success: true,
      message: "Logged out from all devices",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    await authService.changePassword(
      req.user._id,
      oldPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const data =
      await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


export default {
  register,
  login,
  getCurrentUser,
  logout,
  changePassword,
  refreshToken,
  logoutAllDevices,
};