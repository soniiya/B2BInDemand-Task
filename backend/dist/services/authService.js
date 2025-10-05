import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
export const signUp = async (payload) => {
    const { email, password, name } = payload;
    const organizationId = "ORG_ID";
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return null;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        // const superAdminRole = await Role.findOne({ name: 'SuperAdmin' });
        // if (!superAdminRole) {
        // throw new Error("Default role 'SuperAdmin' not found.");
        // }
        const newUser = new User({
            name,
            email,
            passwordHash: passwordHash,
            organization_id: organizationId,
            role_id: 'superAdmin'
        });
        const savedUser = await newUser.save();
        await savedUser.populate([
            { path: 'role_id', select: 'name permissions' },
            { path: 'organization_id', select: 'name' }
        ]);
        return savedUser;
    }
    catch (error) {
        console.error('MongoDB error during user sign up:', error);
        throw new Error('Failed to create user account.');
    }
};
export const getUserByEmailWithHash = async (email) => {
    try {
        const user = await User.findOne({ email }).select('+passwordHash');
        return user;
    }
    catch (error) {
        console.error('MongoDB error during user retrieval:', error);
        return null;
    }
};
export const updateLastLogin = async (user) => {
    try {
        const userDoc = await User.findById(user._id);
        if (userDoc) {
            userDoc.lastLoginAt = new Date();
            await userDoc.save();
        }
    }
    catch (error) {
        console.error('MongoDB error updating last login:', error);
    }
};
