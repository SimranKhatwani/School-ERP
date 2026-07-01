import tenantRepository from "./tenant.repository.js";

const createTenant = async (tenantData) => {
  const existingTenant =
    await tenantRepository.findTenantBySubdomain(
      tenantData.subdomain
    );

  if (existingTenant) {
    throw new Error("Subdomain already exists");
  }

  return await tenantRepository.createTenant(
    tenantData
  );
};

const getAllTenants = async () => {
  return await tenantRepository.getAllTenants();
};

// deactivate tenant
const deactivateTenant = async (tenantId) => {
  const tenant =
    await tenantRepository.findTenantById(tenantId);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return await tenantRepository.deactivateTenant(
    tenantId
  );
};

export default {
  createTenant,
  getAllTenants,
    deactivateTenant,
};