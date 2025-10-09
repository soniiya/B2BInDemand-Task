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

const jwt_secret = process.env.JWT_SECRET  

export const checkAccess = (requiredPermission: string, resourceType: 'lead' | 'project'| 'task') => 
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => { 
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
    
    if (!user.permissions || !user.permissions.includes(requiredPermission)) {
        console.warn(`[AUTH FAIL] User ${user.userId} missing permission: ${requiredPermission}`);
        return res.status(403).json({ message: 'Forbidden: Insufficient role permissions.' });
    }
    
    const isRecordAction = requiredPermission.endsWith('.update') || requiredPermission.endsWith('.delete');

    if (isRecordAction || requiredPermission.endsWith('.view')) {
        if (!recordId) {
            console.log(`[AUTH BYPASS] Collection route (${requiredPermission}). Proceeding to controller.`);
            return next();
        }
        
        if (user.roleName === 'Admin' || user.roleName === 'Auditor' || user.roleName === 'Manager') {
            return next();
        }
        
        const record = await getRecord(resourceType, recordId); 

        console.log("resourceType", resourceType)
        console.log("record", record)

        if (!record) {
            return res.status(404).json({ message: `Resource not found or inaccessible.` });
        }
        
        if (record.owner_id.toString() !== user.userId) {
            return res.status(403).json({ message: `Forbidden: You can only modify your assigned records.` });
        }
    }
    
    next();
};

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if(!jwt_secret) throw Error("jwt token not present")
    
    try {
        const decoded = jwt.verify(token, jwt_secret)
        const user = decoded as CustomJwtPayload;
        req.user = user;
        next();
        
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please log in again.', code: 'TOKEN_EXPIRED' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token. Access denied.', code: 'INVALID_TOKEN' });
        }
        
        return res.status(401).json({ message: 'Authentication failed.', code: 'AUTH_FAILED' });
    }
};