import mongoose from 'mongoose';
import { Role } from '../models/RoleSchema.js';
import { connectDB } from '../dbConfig.js';
const defaultRoles = [
    {
        name: 'SuperAdmin',
        permissions: ['lead.create', 'lead.view', 'lead.update', 'lead.delete', 'lead.assign',
            'project.create', 'project.view', 'task.create', 'task.update', 'task.delete', 'task.assign',
            'user.invite', 'user.view', 'role.manage', 'permission.view',
            'org.manage', 'audit.view', 'note.create', 'file.upload', 'file.delete'],
        is_admin: true
    },
    {
        name: 'Admin',
        permissions: ['lead.create', 'lead.view', 'lead.update', 'lead.delete', 'lead.assign',
            'project.create', 'project.view', 'task.create', 'task.update', 'task.delete', 'task.assign',
            'user.invite', 'user.view', 'role.manage', 'permission.view',
            'audit.view', 'note.create', 'file.upload', 'file.delete'],
        is_admin: true
    },
    {
        name: 'Agent',
        permissions: ['lead.create', 'lead.view', 'lead.update', 'lead.delete',
            'task.create', 'task.view', 'task.update', 'task.delete',
            'project.view', 'note.create', 'file.upload'],
        is_admin: false
    },
];
async function seedRoles() {
    await connectDB();
    try {
        console.log('Starting role seeding...');
        const result = await Role.insertMany(defaultRoles, { ordered: false });
        console.log(`Successfully seeded ${result.length} roles.`);
    }
    catch (error) {
        if (error.code === 11000) {
            console.log("Roles already exist in the database. Seeding skipped.");
        }
        else {
            console.error("Error during role seeding:", error);
        }
    }
    finally {
        mongoose.connection.close();
    }
}
seedRoles();
