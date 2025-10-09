import * as projectService from "../services/projectService.js";
import { Task } from "../models/TaskModel.js";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/User.js";

export const createProject = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const ownerId = req.user?.userId;
    if (!ownerId) {
      return res.status(401).json({ error: "Authentication data missing." });
    }
    const projectPayload = {
      ...req.body,
      owner_id: ownerId,
    };
    const project = await projectService.createProjectService(projectPayload);
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.page_size as string) || 25;

        const safePage = Math.max(1, page);
        const safePageSize = Math.max(1, pageSize);

        const result = await projectService.getAllProjectsService(safePage, safePageSize);

        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getSearchedProject = async (req: Request, res: Response) => {
  try {
    const filters = {
      status: req.query.status ? String(req.query.status) : "",
      name: req.query.name ? String(req.query.name) : "",
      updatedAfter: req.query.updatedAfter
        ? String(req.query.updatedAfter)
        : "",
      updatedBefore: req.query.updatedBefore
        ? String(req.query.updatedBefore)
        : "",
    };

    const projects = await projectService.listProjectsService(filters);
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectWithTasks(
      req.params.id,
      Task
    );
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
    const project = await projectService.updateProjectService(
      req.params.id,
      req.body
    );
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
