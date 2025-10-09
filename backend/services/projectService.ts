import { Project } from "../models/ProjectModel.js";
import { PaginatedResult } from "../types/Common.js";


export const createProjectService = async (projectPayload: any) => {
  return await Project.create(projectPayload);
};

// export const getAllProjectsService = async () => {
//   return await Project.find()
// }

export const getAllProjectsService = async (page: number, pageSize: number): Promise<PaginatedResult<any>> => {
    const skip = (page - 1) * pageSize;

    const total = await Project.countDocuments({});

    const projects = await Project.find({})
        .limit(pageSize) 
        .skip(skip)      
        .sort({ createdAt: -1 }); 

    const totalPages = Math.ceil(total / pageSize);
    return {
        data: projects,
        page: page,
        page_size: pageSize,
        total: total,
        total_pages: totalPages,
    };
};

export const removeProjectService = async (id: string) => {
  return await Project.findByIdAndDelete(id)
}

// export const getProjectByIdService = async (id: string) => {
//   return await Project.findById(id)
// }

export const listProjectsService = async (filters: any) => {
  const query: Record<string, any> = {};

  const status = filters.status.trim();  
  if (status.length > 0) {
    query.status = status;
    query.status = status.toLowerCase();
  }

  const name = filters.name.trim()
  if (name.length > 0) {
    query.name = { $regex: name, $options: "i" };
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

  return await Project.find(query).sort({ updatedAt: -1 });
};

export const getProjectWithTasks = async (projectId: string, TaskModel: any) => {
  const project = await Project.findById(projectId);
  if (!project) return null;

  const tasks = await TaskModel.find({ projectId });
  const taskSummary = {
    total: tasks.length,
    completed: tasks.filter((t: any) => t.completed).length,
    pending: tasks.filter((t: any) => !t.completed).length,
  };

  return { project, taskSummary };
};

export const updateProjectService = async (projectId: string, data: any) => {
  return await Project.findByIdAndUpdate(projectId, data, { new: true });
};
