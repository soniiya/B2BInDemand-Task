export type OrgStatusType = 'active' | 'inactive';
export type UserStatusType = 'active' | 'pending' | 'suspended';
export type ProjectStatusType = 'active' | 'on_hold' | 'completed';
export type TaskStatusType = 'todo' | 'in_progress' | 'done';
export type LeadStatusType = 'new' | 'qualified' | 'won' | 'lost';


export type RoleType = 'SuperAdmin' | 'Admin' | 'Manager' | 'Agent' | 'Auditor';
export type TokenType = 'refresh' | 'password_reset' | 'email_verify'

export interface PaginatedResult<T> {
    data: T[];
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
}