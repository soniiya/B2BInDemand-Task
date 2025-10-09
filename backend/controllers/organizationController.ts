import * as organizationService from "../services/organizationService.js";
import { Request, Response } from "express";

export const createOrganizations = async (req: Request, res: Response) => {
  try {
      const {data} = req.body
      console.log("req body", req.body)
      const newOrg = await organizationService.createOrgService(data);
      res.status(201).json(newOrg);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
}

export const getOrgById = async (req: Request, res: Response) => {
  try {
    const Org = await organizationService.getOrgByIdService(req.params.id);
    if (!Org) {
      return res.status(404).json({ error: "Org not found" });
    }
    res.json(Org);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// export const getAllOrganizations = async (req: Request, res: Response) => {
//   try {
//     const orgs = await organizationService.getAllOrgService(); 
//     res.json(orgs);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getAllOrgs = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.page_size as string) || 25;

        const safePage = Math.max(1, page);
        const safePageSize = Math.max(1, pageSize);

        const result = await organizationService.getAllOrgsService(safePage, safePageSize);

        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateOrganization = async (req: Request, res: Response) => {
    try {
        const orgs = await organizationService.updateOrgService(req.params.id, req.body);
        if (!orgs) {
          return res.status(404).json({ error: "Organization not found" });
        }
        res.json(orgs);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const removeOrg = async (req: Request, res: Response) => {
  try {
    const Org = await organizationService.removeOrgService(req.params.id);
    if (!Org) {
      return res.status(404).json({ error: "Org not found" });
    }
    res.json(Org);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};