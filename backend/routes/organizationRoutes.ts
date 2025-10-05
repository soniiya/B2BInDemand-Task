import {Router} from "express";
import {createOrganizations, getAllOrganizations, getOrgById, updateOrganization} from "../controllers/organizationController.js";

const router = Router();

router.post('/', createOrganizations)
router.get("/", getAllOrganizations);
router.get("/:id", getOrgById);
router.put("/:id", updateOrganization);

export default router;
