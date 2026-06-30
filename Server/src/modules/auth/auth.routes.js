import express from "express";
import authController from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import loginLimiter from "../../middleware/rateLimiter.js";
import validate from "../../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../../validation/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login",loginLimiter,validate(loginSchema),authController.login);

router.get("/me", authMiddleware, authController.getCurrentUser);

router.put(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  authController.changePassword
);

router.post(
  "/logout",
  authMiddleware,
  authController.logout
);

export default router;