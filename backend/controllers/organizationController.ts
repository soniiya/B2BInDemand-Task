import * as organizationService from "../services/organizationService.js";
import { Request, Response } from "express";

export const createOrganizations = async (req: Request, res: Response) => {
  try {
      const {data} = req.body
      const task = await organizationService.createTaskService(data);
      res.status(201).json(task);
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

export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const orgs = await organizationService.getAllOrgService(); 
    res.json(orgs);
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
        res.json();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}