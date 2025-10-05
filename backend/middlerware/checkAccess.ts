import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/User.js'; 
import { getRecord } from '../utils/getRecord.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export interface CustomJwtPayload extends JwtPayload {
    userId: string;
    roleName: string;
    permissions: string[];
}

export const checkAccess = (requiredPermission: string, resourceType: 'lead' | 'project') => 
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const jwt_secret = process.env.JWT_SECRET   
     if(!jwt_secret) throw Error("jwt token not present")
     
    const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const decoded = jwt.verify(token, jwt_secret);

    if (typeof decoded === 'string') {
        return res.status(401).json({ message: 'Invalid token payload.' });
    }

    const user = decoded as CustomJwtPayload;

    req.user = user;

    const recordId = req.params.id; 

    if (!user) {
        return res.status(401).json({ message: 'Authentication required.' });
    }
    
    if (user.roleName === 'SuperAdmin') {
        return next();
    }
    
    if (!user.permissions.includes(requiredPermission)) {
        console.warn(`[AUTH FAIL] User ${user.userId} missing permission: ${requiredPermission}`);
        return res.status(403).json({ message: 'Forbidden: Insufficient role permissions.' });
    }

    const isRecordAction = requiredPermission.endsWith('.update') || requiredPermission.endsWith('.delete');

    if (isRecordAction || requiredPermission.endsWith('.view')) {
        if (user.roleName === 'Admin' || user.roleName === 'Auditor') {
            return next();
        }
        
        const record = await getRecord(resourceType, recordId); 

        if (!record) {
            return res.status(404).json({ message: `Resource not found or inaccessible.` });
        }
        
        if (user.roleName === 'Agent') {
            if (record.owner_id.toString() !== user.userId) {
                return res.status(403).json({ message: `Forbidden: Agents can only modify their assigned records.` });
            }
        }
    }
    
    next();
};

