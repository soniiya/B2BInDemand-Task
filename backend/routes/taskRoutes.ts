import {Router} from "express";
import {createTask, getAllTasks, getSearchedTask, getTaskById, updateTask, removeTask} from "../controllers/taskController.js";
import { checkAccess } from "../middlerware/checkAccess.js";

const router = Router();

router.post("/",checkAccess('task.create', 'task'), createTask);
router.get("/",checkAccess('task.view', 'task'), getAllTasks);
router.get('/search',checkAccess('task.view', 'task'), getSearchedTask)
router.get("/:id",checkAccess('task.view', 'task'), getTaskById);
router.put("/:id",checkAccess('task.update', 'task'), updateTask);
router.delete("/:id",checkAccess('task.delete', 'task'), removeTask);

export default router;
