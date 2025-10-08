import * as leadService from "../services/leadService.js";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/User.js";

export const createLead = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const ownerId = req.user?.userId;
    if (!ownerId) {
      return res.status(401).json({ error: "Authentication data missing." });
    }
    const {data} = req.body;
    const leadPayload = {
      ...data,
      owner_id: ownerId
    };
    const lead = await leadService.createLeadService(leadPayload);
    res.status(201).json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


// export const getAllLeads = async (req: Request, res: Response) => {
//   try {
//     const leads = await leadService.getAllLeadService(); 
//     res.json(leads);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };


export const getAllLeads = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.page_size as string) || 25;

        const safePage = Math.max(1, page);
        const safePageSize = Math.max(1, pageSize);

        const result = await leadService.getAllLeadService(safePage, safePageSize);

        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getSearchedLead = async (req: Request, res: Response) => {
  try {
    const filters = {
      status: req.query.status,
      owner: req.query.owner,
      source: req.query.source,
      date: req.query.range,
      updatedAfter: req.query.updatedAfter,
      updatedBefore: req.query.updatedBefore,
    };

    const Leads = await leadService.getSearchedLeadService(filters);
    res.json(Leads);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.getleadById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "lead not found" });
    }
    res.json(lead);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.updateLeadService(req.params.id, req.body);
    if (!lead) {
      return res.status(404).json({ error: "lead not found" });
    }
    res.json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeLead = async (req: Request, res: Response) => {
  try {
    const lead = await leadService.removeLeadService(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "lead not found" });
    }
    res.json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
