import { getRecord } from '../utils/getRecord.js';
export const checkAccess = (requiredPermission, resourceType) => async (req, res, next) => {
    const user = req.user;
    const recordId = req.params.id;
    if (!user) {
        return res.status(401).json({ message: 'Authentication required.' });
    }
    console.log("user role", user.roleName);
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
