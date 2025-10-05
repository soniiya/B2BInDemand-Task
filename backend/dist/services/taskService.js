import { Task } from "../models/TaskModel.js";
export const createTaskService = async (data) => {
    return await Task.create(data);
};
export const getAllTasksService = async () => {
    return await Task.find();
};
export const getTaskByIdService = async (id) => {
    return await Task.findById(id);
};
export const removeTaskService = async (id) => {
    return await Task.findByIdAndDelete(id);
};
export const updateTaskService = async (taskId, data) => {
    return await Task.findByIdAndUpdate(taskId, data, { new: true });
};
export const getSearchedTaskService = async (filters) => {
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
    return await Task.find(query).sort({ updatedAt: -1 });
};
