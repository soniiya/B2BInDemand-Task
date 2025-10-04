import { OrgStatusType } from './Common.js';

export interface OrganizationType {
  id: number;
  name: string;
  domain: string;
  status: OrgStatusType;
  createdAt: Date;
}

export interface OrganizationPayloadType {
  name: string;
  domain: string;
  status?: OrgStatusType;
}