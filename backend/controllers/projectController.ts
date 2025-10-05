import * as projectService from "../services/projectService.js";
import { Task } from "../models/TaskModel.js"; 
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/User.js";


export const createProject = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const ownerId = req.user?.userId;
    if (!ownerId) {
      return res.status(401).json({ error: "Authentication data missing." });
    }
    const projectPayload = {
      ...req.body,
      owner_id: ownerId
    };
    const project = await projectService.createProjectService(projectPayload);
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjectsService(); 
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSearchedProject = async (req: Request, res: Response) => {
  try {
    const filters = {
      status: req.query.status,
      name: req.query.name,
      updatedAfter: req.query.updatedAfter,
      updatedBefore: req.query.updatedBefore,
    };

    const projects = await projectService.listProjectsService(filters);
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectWithTasks(req.params.id, Task);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.updateProjectService(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.removeProjectService(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
