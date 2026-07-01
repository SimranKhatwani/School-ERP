import express from "express";
import tenantController from "./tenant.controller.js";

const router = express.Router();

router.post("/", tenantController.createTenant);

router.get("/", tenantController.getAllTenants);

router.patch("/:id/deactivate",tenantController.deactivateTenant);

export default router;