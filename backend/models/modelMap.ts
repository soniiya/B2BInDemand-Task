import { Lead } from '../models/LeadModel.js';
import { Project } from '../models/ProjectModel.js';
import { Task } from '../models/TaskModel.js';
import { Organization } from './OrganizationModel.js';

export const modelMap = {
    lead: Lead,
    project: Project,
    task: Task,
    org: Organization
};