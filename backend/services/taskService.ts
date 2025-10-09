import { Task } from "../models/TaskModel.js";
import { PaginatedResult } from "../types/Common.js";

export const createTaskService = async (data: any) => {
  return await Task.create(data);
};

export const getAllTasksService = async (page: number, pageSize: number): Promise<PaginatedResult<any>> => {
    const skip = (page - 1) * pageSize;

    const total = await Task.countDocuments({});

    const tasks = await Task.find({})
        .limit(pageSize) 
        .skip(skip)      
        .sort({ createdAt: -1 }); 

    const totalPages = Math.ceil(total / pageSize);

    return {
        data: tasks,
        page: page,
        page_size: pageSize,
        total: total,
        total_pages: totalPages,
    };
};

export const getTaskByIdService = async (id: string) => {
  return await Task.findById(id)
}

export const removeTaskService = async (id: string) => {
  return await Task.findByIdAndDelete(id)
}

export const updateTaskService = async (taskId: string, data: any) => {
  return await Task.findByIdAndUpdate(taskId, data, { new: true });
};

export const getSearchedTaskService = async (filters: any) => {
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

  return await Task.find(query).sort({ updatedAt: -1 });
};
