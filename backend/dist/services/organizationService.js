import { Organization } from "../models/OrganizationModel.js";
export const getAllOrgService = async () => {
    return await Organization.find();
};
export const updateOrgService = async (orgId, data) => {
    return await Organization.findByIdAndUpdate(orgId, data, { new: true });
};
