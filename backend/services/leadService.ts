import { Lead } from "../models/LeadModel.js";

export const createLeadService = async (leadPayload: any) => {
  return await Lead.create(leadPayload);
};

export const getAllLeadService = async (page: number, pageSize: number) => {
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

  const name = filters.title.trim();  
  if (name.length > 0) {
    query.title = { $regex: name, $options: "i" };
  }

  const status = filters.status.trim();  
  if (status.length > 0) {
    query.status = status;
    query.status = status.toLowerCase();
  }

  const source = filters.source.trim()
   if (source.length > 0) {
    query.source = source;
  }

  const owner = filters.owner.trim()
  if (owner.length > 0) {
    query.name = { $regex: owner, $options: "i" };
  }
  if (filters.updatedAfter || filters.updatedBefore) {
    query.updatedAt = {};

    const updatedAfterStr = String(filters.updatedAfter).trim();
    if (updatedAfterStr) {
      query.updatedAt.$gte = new Date(updatedAfterStr);
    }

    const updatedBeforeStr = String(filters.updatedBefore).trim();
    if (updatedBeforeStr) {
      query.updatedAt.$lte = new Date(updatedBeforeStr);
    }
  }

    console.log("filter query", query)


  return await Lead.find(query).sort({ updatedAt: -1 });
};