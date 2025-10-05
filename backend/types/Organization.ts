import { Types } from 'mongoose';
import { OrgStatusType } from './Common.js';

export interface OrganizationType {
  organization_id: Types.ObjectId;
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