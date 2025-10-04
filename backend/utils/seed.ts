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