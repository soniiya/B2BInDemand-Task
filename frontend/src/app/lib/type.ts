export type SignUpData = {
  name: string;
  email: string;
  password: string;
  orgDomain?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ProjectStatus = "pending" | "active" | "completed";

export type CreateProjectType = {
  // orgId: string;
  name: string;
  client?: string;
  status: "pending" | "active" | "completed";
};

export type ProjectType = {
  _id: string;
  name: string;
  client?: string;
  status: "pending" | "active" | "completed";
  org_id: string;
  createdAt: string;
  updatedAt: string;
};

export type SourceType = "web" | "email" | "phone" | "referral" | "other";

export type LeadStatus = "new" | "qualified" | "won" | "lost";

export type LeadType = {
  _id: string;
  org_id: string;
  title: string;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  source: SourceType;
  status: LeadStatus;
  owner_user_id: string;
};

export type CreateLeadType = {
  title: string;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  source: SourceType;
  status: LeadStatus;
};

export type TaskStatus = "todo" | "in_progress" | "done"

export type TaskPriority = "low" | "medium" |  "high"

export type TaskType = {
    _id: string,
    project_id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    assignee_user_id: string,
    due_date: number,
}

export type CreateTaskType = {
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
}

export type OrgStatusType = 'active' | 'inactive';

export type OrgType = {
    _id?: string,
    name: string,
    status: OrgStatusType,
    domain: string
}
export type CreateOrgType = {
  name: string,
  status: OrgStatusType
  domain: string,
}