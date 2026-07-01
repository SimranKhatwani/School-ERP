import Tenant from "./tenant.model.js";

const createTenant = async (tenantData) => {
  return await Tenant.create(tenantData);
};

const findTenantBySubdomain = async (subdomain) => {
  return await Tenant.findOne({ subdomain });
};

const findTenantById = async (id) => {
  return await Tenant.findById(id);
};

const getAllTenants = async () => {
  return await Tenant.find();
};

// deactivate tenant
const deactivateTenant = async (id) => {
  return await Tenant.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    {
      new: true,
    }
  );
};

export default {
  createTenant,
  findTenantBySubdomain,
  findTenantById,
 getAllTenants,
  deactivateTenant,
};