import { Lead } from "../models/LeadModel.js";

export const createLeadService = async (leadPayload: any) => {
  return await Lead.create(leadPayload);
};

export const getAllLeadService = async (page: number, pageSize: number) => {
  //return await Lead.find()

  const skip = (page - 1) * pageSize;
  
      const total = await Lead.countDocuments({});
  
      const leads = await Lead.find({})
          .limit(pageSize) 
          .skip(skip)      
          .sort({ createdAt: -1 }); 
  
      const totalPages = Math.ceil(total / pageSize);
  
      return {
          data: leads,
          page: page,
          page_size: pageSize,
          total: total,
          total_pages: totalPages,
      };
}

export const removeLeadService = async (id: string) => {
  return await Lead.findByIdAndDelete(id)
}

export const getleadById = async (LeadId: string) => {
  const lead = await Lead.findById(LeadId);
  if (!Lead) return null;
  return lead;
};

export const updateLeadService = async (LeadId: string, data: any) => {
  return await Lead.findByIdAndUpdate(LeadId, data, { new: true });
};

export const getSearchedLeadService = async (filters: any) => {
  const query: Record<string, any> = {};

  if (filters.status) {
    query.status = filters.status;
  }

   if (filters.source) {
    query.source = filters.source;
  }

  if (filters.owner) {
    query.name = { $regex: filters.owner, $options: "i" };
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