import {Router} from "express";
import {createLead, getAllLeads, getSearchedLead, getLeadById, updateLead, removeLead} from "../controllers/leadController.js";
import { checkAccess } from "../middlerware/checkAccess.js";

const router = Router();

router.post("/", checkAccess('lead.create', 'lead'), createLead);
router.get("/", checkAccess('lead.view', 'lead'), getAllLeads);
router.get('/search', getSearchedLead)
router.get("/:id", checkAccess('lead.view', 'lead'), getLeadById);
router.put("/:id", checkAccess('lead.update', 'lead'), updateLead);
router.delete("/:id",checkAccess('lead.remove', 'lead'),  removeLead);

export default router;
