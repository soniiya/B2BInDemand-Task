import { Lead } from "../models/LeadModel.js";
export const createLeadService = async (data) => {
    return await Lead.create(data);
};
export const getAllLeadService = async () => {
    return await Lead.find();
};
export const removeLeadService = async (id) => {
    return await Lead.findByIdAndDelete(id);
};
export const getleadById = async (LeadId) => {
    const lead = await Lead.findById(LeadId);
    if (!Lead)
        return null;
    return lead;
};
export const updateLeadService = async (LeadId, data) => {
    return await Lead.findByIdAndUpdate(LeadId, data, { new: true });
};
export const getSearchedLeadService = async (filters) => {
    const query = {};
    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.name) {
        query.name = { $regex: filters.name, $options: "i" };
    }
    if (filters.updatedAfter || filters.updatedBefore) {
        query.updatedAt = {};
        if (filters.updatedAfter) {
            query.updatedAt.$gte = new Date(filters.updatedAfter);
        }
        if (filters.updatedBefore) {
            query.updatedAt.$lte = new Date(filters.updatedBefore);
        }
    }
    return await Lead.find(query).sort({ updatedAt: -1 });
};
