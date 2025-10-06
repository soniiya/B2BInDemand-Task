import { Organization } from "../models/OrganizationModel.js";

export const createOrgService = async (data: any) => {
  return await Organization.create(data)
}

export const getAllOrgService = async () => {
  return await Organization.find();
};

export const getOrgByIdService = async (id: string) => {
  return await Organization.findById(id);
};

export const updateOrgService = async (orgId: string, data: any) => {
 return await Organization.findByIdAndUpdate(orgId, data, { new: true });
}

export const removeOrgService = async (orgId: string) => {
return await Organization.findByIdAndDelete(orgId)
}