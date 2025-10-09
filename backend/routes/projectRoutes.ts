import {Router} from "express";
import {createProject, getAllProjects, getSearchedProject, getProjectById, updateProject, removeProject} from "../controllers/projectController.js";
import { checkAccess } from "../middlerware/checkAccess.js";

const router = Router();

router.post("/", checkAccess('project.create', 'project'), createProject);
router.get("/",checkAccess('project.view', 'project'),  getAllProjects);
router.get('/search', checkAccess('project.view', 'project'), getSearchedProject)
router.get("/:id", checkAccess('project.view', 'project'), getProjectById);
router.put("/:id", checkAccess('project.update', 'project'), updateProject);
router.delete("/:id",checkAccess('project.delete', 'project'), removeProject);

export default router;
