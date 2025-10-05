import { Router } from "express";
import { getAllOrganizations, updateOrganization } from "../controllers/organizationController.js";
const router = Router();
router.get("/", getAllOrganizations);
router.put("/:id", updateOrganization);
export default router;
