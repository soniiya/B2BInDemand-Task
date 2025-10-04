import { Project } from "../models/ProjectModel.js";

export const createProjectService = async (data: any) => {
  return await Project.create(data);
};

export const getAllProjectsService = async () => {
  return await Project.find()
}

export const removeProjectService = async (id: string) => {
  return await Project.findByIdAndDelete(id)
}

// export const getProjectByIdService = async (id: string) => {
//   return await Project.findById(id)
// }

export const listProjectsService = async (filters: any) => {
  const query: Record<string, any> = {};

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
