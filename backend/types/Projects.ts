export type ProjectStatus = 'pending' | 'active' | 'completed';

export type ProjectType = {
   org_id: string,
   name: string,
   client?: string,
   status: ProjectStatus
}
