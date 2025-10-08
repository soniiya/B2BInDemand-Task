import {Router} from "express";
import {createTask, getAllTasks, getSearchedTask, getTaskById, updateTask, removeTask} from "../controllers/taskController.js";
import { checkAccess } from "../middlerware/checkAccess.js";

const router = Router();

router.post("/", checkAccess('task.create', 'task'), createTask);
router.get("/", getAllTasks);
router.get('/search', getSearchedTask)
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", removeTask);

export default router;
