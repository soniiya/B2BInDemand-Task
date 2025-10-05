import * as leadService from "../services/leadService.js";
export const createLead = async (req, res) => {
    try {
        const { data } = req.body;
        const lead = await leadService.createLeadService(data);
        res.status(201).json(lead);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getAllLeads = async (req, res) => {
    try {
        // 💡 Service call to get ALL leads (maybe with simple pagination limits)
        const leads = await leadService.getAllLeadService();
        res.json(leads);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getSearchedLead = async (req, res) => {
    try {
        const filters = {
            status: req.query.status,
            owner: req.query.owner,
            source: req.query.source,
            date: req.query.range,
            updatedAfter: req.query.updatedAfter,
            updatedBefore: req.query.updatedBefore,
        };
        const projects = await leadService.getSearchedLeadService(filters);
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getLeadById = async (req, res) => {
    try {
        const lead = await leadService.getleadById(req.params.id);
        if (!lead) {
            return res.status(404).json({ error: "lead not found" });
        }
        res.json(lead);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateLead = async (req, res) => {
    try {
        const lead = await leadService.updateLeadService(req.params.id, req.body);
        if (!lead) {
            return res.status(404).json({ error: "lead not found" });
        }
        res.json(lead);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const removeLead = async (req, res) => {
    try {
        const lead = await leadService.removeLeadService(req.params.id);
        if (!lead) {
            return res.status(404).json({ error: "lead not found" });
        }
        res.json(lead);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
