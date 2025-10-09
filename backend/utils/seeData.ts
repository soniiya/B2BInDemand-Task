export const rolesData = [
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
        name: 'Manager',
        permissions: ['lead.create', 'lead.view', 'lead.update', 'lead.assign', 
                      'project.create', 'project.view', 'task.create', 'task.update', 'task.delete', 'task.assign',
                      'user.invite', 'user.view', 'role.manage', 'permission.view', 
                      'audit.view', 'note.create', 'file.upload', 'file.delete'], 
        is_admin: false
    },
    {
        name: 'Agent',
        permissions: ['lead.create', 'lead.view', 'lead.update', 'lead.delete', 
                      'task.create', 'task.view', 'task.update', 'task.delete', 
                      'project.view', 'note.create', 'file.upload'], 
        is_admin: false
    },
    { name: 'Auditor', 
      permissions: ['lead.view', 'project.view', 'task.view', 'audit.view'],
      is_admin: false, 
    },
];

export const demoUsers = [
    { email: 'superadmin@acme.test', roleName: 'SuperAdmin' },
    { email: 'admin@acme.test', roleName: 'Admin' },
    { email: 'manager@acme.test', roleName: 'Manager' },
    { email: 'agent@acme.test', roleName: 'Agent' },
    { email: 'auditor@acme.test', roleName: 'Auditor' },
];
export const DEMO_PASSWORD = 'Passw0rd!';


export const allPermissions = Array.from(new Set(rolesData.flatMap(r => r.permissions)));

