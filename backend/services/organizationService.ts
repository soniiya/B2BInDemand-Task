import { Organization } from "../models/OrganizationModel.js";

export const getAllOrgService = async () => {
  return await Organization.find();
};

export const updateOrgService = async (orgId: string, data: any) => {
 return await Organization.findByIdAndUpdate(orgId, data, { new: true });
}