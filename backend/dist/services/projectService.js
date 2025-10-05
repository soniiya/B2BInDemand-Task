import { Project } from "../models/ProjectModel.js";
export const createProjectService = async (data) => {
    return await Project.create(data);
};
export const getAllProjectsService = async () => {
    return await Project.find();
};
export const removeProjectService = async (id) => {
    return await Project.findByIdAndDelete(id);
};
// export const getProjectByIdService = async (id: string) => {
//   return await Project.findById(id)
// }
export const listProjectsService = async (filters) => {
    const query = {};
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
export const getProjectWithTasks = async (projectId, TaskModel) => {
    const project = await Project.findById(projectId);
    if (!project)
        return null;
    const tasks = await TaskModel.find({ projectId });
    const taskSummary = {
        total: tasks.length,
        completed: tasks.filter((t) => t.completed).length,
        pending: tasks.filter((t) => !t.completed).length,
    };
    return { project, taskSummary };
};
export const updateProjectService = async (projectId, data) => {
    return await Project.findByIdAndUpdate(projectId, data, { new: true });
};
