import { Organization } from "../models/OrganizationModel.js";
import { PaginatedResult } from "../types/Common.js";

export const createOrgService = async (data: any) => {
  return await Organization.create(data)
}

export const getAllOrgsService = async (page: number, pageSize: number): Promise<PaginatedResult<any>> => {
    const skip = (page - 1) * pageSize;

    const total = await Organization.countDocuments({});

    const Orgs = await Organization.find({})
        .limit(pageSize) 
        .skip(skip)      
        .sort({ createdAt: -1 }); 

    const totalPages = Math.ceil(total / pageSize);

    return {
        data: Orgs,
        page: page,
        page_size: pageSize,
        total: total,
        total_pages: totalPages,
    };
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