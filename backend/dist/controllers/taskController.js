import * as taskservice from "../services/taskService.js";
export const createTask = async (req, res) => {
    try {
        const { data } = req.body;
        // console.log("task schema", req.body)
        const task = await taskservice.createTaskService(data);
        res.status(201).json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskservice.getAllTasksService();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getTaskById = async (req, res) => {
    try {
        const task = await taskservice.getTaskByIdService(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "task not found" });
        }
        res.json(task);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateTask = async (req, res) => {
    try {
        const task = await taskservice.updateTaskService(req.params.id, req.body);
        if (!task) {
            return res.status(404).json({ error: "task not found" });
        }
        res.json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const removeTask = async (req, res) => {
    try {
        const task = await taskservice.removeTaskService(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "task not found" });
        }
        res.json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getSearchedTask = async (req, res) => {
    try {
        const filters = {
            status: req.query.status,
            name: req.query.name,
            updatedAfter: req.query.updatedAfter,
            updatedBefore: req.query.updatedBefore,
        };
        const projects = await taskservice.getSearchedTaskService(filters);
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
