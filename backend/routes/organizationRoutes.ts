import {Router} from "express";
import {createOrganizations, getAllOrgs, getOrgById, removeOrg, updateOrganization} from "../controllers/organizationController.js";
import { checkAccess } from "../middlerware/checkAccess.js";

const router = Router();

router.post('/', checkAccess('org.manage', 'org'), createOrganizations)
router.get("/", checkAccess('org.manage', 'org'), getAllOrgs);
router.get("/:id", checkAccess('org.manage', 'org'), getOrgById);
router.put("/:id", checkAccess('org.manage', 'org'), updateOrganization);
router.delete("/:id", checkAccess('org.manage', 'org'), removeOrg);

export default router;
