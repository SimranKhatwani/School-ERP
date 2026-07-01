import tenantRepository from "../modules/tenant/tenant.repository.js";

const tenantResolver = async (req, res, next) => {
  try {
    // Read tenant from request header
    const subdomain = req.headers["x-tenant-subdomain"];

    if (!subdomain) {
      return res.status(400).json({
        success: false,
        message: "Tenant subdomain is required",
      });
    }

    // Find tenant
    const tenant = await tenantRepository.findTenantBySubdomain(subdomain);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    // Check if tenant is active
    if (!tenant.isActive) {
      return res.status(403).json({
        success: false,
        message: "Tenant is deactivated",
      });
    }

    // Attach tenant to request
    req.tenant = tenant;

    next();
  } catch (error) {
    next(error);
  }
};

export default tenantResolver;