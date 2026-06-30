import express from "express";
import authController from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import loginLimiter from "../../middleware/loginRateLimiter.js";
import validate from "../../middleware/validate.middleware.js";
import {registerSchema,loginSchema,changePasswordSchema,} from "../../validation/auth.validation.js";
import auditLogger from "../../middleware/auditLogger.middleware.js";



const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login",loginLimiter,auditLogger("USER_LOGIN") ,validate(loginSchema),authController.login);

router.get("/me", authMiddleware, authController.getCurrentUser);

router.put(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
    auditLogger("CHANGE_PASSWORD"),
  authController.changePassword
);

router.post(
  "/logout",
  authMiddleware,
  auditLogger("USER_LOGOUT"),
  authController.logout
);

router.post(
  "/refresh-token",
    auditLogger("REFRESH_TOKEN"),
  authController.refreshToken
);

router.post(
  "/logout-all-devices",
  authMiddleware,
  auditLogger("USER_LOGOUT_ALL"),
  authController.logoutAllDevices
);



export default router;