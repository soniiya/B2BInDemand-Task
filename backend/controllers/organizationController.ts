import * as organizationService from "../services/organizationService.js";
import { Task } from "../models/TaskModel.js"; 
import { Request, Response } from "express";

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