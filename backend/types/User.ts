import { Types } from "mongoose";
import { UserStatusType } from "./Common.js";
import { OrganizationType } from "./Organization.js";
import { Request } from 'express';

export interface AuthPayload {
    userId: string;
    roleName: string; 
    permissions: string[]; 
}

export interface AuthenticatedRequest extends Request {
    user?: AuthPayload;
}

export type PermissionKey = string; 

export interface RoleType {
    _id: Types.ObjectId;
    name: string; 
    permissions: PermissionKey[]; 
}

export interface UserType {
    _id: Types.ObjectId; 
    role_id: Types.ObjectId;       
    
    name: string;
    email: string;
    passwordHash: string; 
    status: UserStatusType;
    lastLoginAt: Date | null;
    createdAt: Date;

    organization?: OrganizationType; 
    role?: RoleType; 
    permissions?: PermissionKey[]; 
}

export interface UserTypeSignUpPayload {
  name: string;
  email: string;
  password: string; 
  confirmPassword: string;
}

export interface UserTypeLoginPayload {
  email: string;
  password: string; 
}