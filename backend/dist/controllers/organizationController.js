import * as organizationService from "../services/organizationService.js";
export const getAllOrganizations = async (req, res) => {
    try {
        const orgs = await organizationService.getAllOrgService();
        res.json(orgs);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateOrganization = async (req, res) => {
    try {
        const orgs = await organizationService.updateOrgService(req.params.id, req.body);
        if (!orgs) {
            return res.status(404).json({ error: "Organization not found" });
        }
        res.json();
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
