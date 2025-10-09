import {Router} from "express";
import {createOrganizations, getAllOrgs, getOrgById, removeOrg, updateOrganization} from "../controllers/organizationController.js";

const router = Router();

router.post('/', createOrganizations)
router.get("/", getAllOrgs);
router.get("/:id", getOrgById);
router.put("/:id", updateOrganization);
router.delete("/:id", removeOrg);

export default router;
