import tenantService from "./tenant.service.js";

const createTenant = async (req, res, next) => {
  try {
    const tenant =
      await tenantService.createTenant(req.body);

    res.status(201).json({
      success: true,
      message: "Tenant created successfully",
      data: tenant,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTenants = async (req, res, next) => {
  try {
    const tenants =
      await tenantService.getAllTenants();

    res.status(200).json({
      success: true,
      data: tenants,
    });
  } catch (error) {
    next(error);
  }
};

// deactivate tenant
const deactivateTenant = async (req, res, next) => {
  try {
    const tenant =
      await tenantService.deactivateTenant(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Tenant deactivated successfully",
      data: tenant,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createTenant,
  getAllTenants,
  deactivateTenant,
};