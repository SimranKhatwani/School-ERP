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

    const data = await authService.login(email, password);

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

export default {
  register,
  login,
};