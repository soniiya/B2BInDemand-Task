import { Organization } from "../models/OrganizationModel.js";

export const createTaskService = async (data: any) => {
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