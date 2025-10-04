import {User}  from '../models/UserModel.js';
import { Role } from '../models/RoleSchema.js';
import { UserType, RoleType } from '../types/User.js';
import bcrypt from 'bcrypt';

export type PopulatedUser = Omit<UserType, 'role_id'> & { role_id: RoleType };

interface SignUpPayload { email: string; password: string; name: string; }

export const signUp = async (payload: SignUpPayload): Promise<UserType | null> => {
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
        return savedUser;

    } catch (error) {
        console.error('MongoDB error during user sign up:', error);
        throw new Error('Failed to create user account.');
    }
};

export const getUserByEmailWithHash = async (email: string): Promise<PopulatedUser | null> => {
    try {
        const user = await User.findOne({ email }).select('+passwordHash').populate({
                path: 'role_id', 
                select: 'name permissions' 
            });;
        return user as PopulatedUser | null;
    } catch (error) {
        console.error('MongoDB error during user retrieval:', error);
        return null;
    }
};


export const updateLastLogin = async (user: PopulatedUser): Promise<void> => {
    console.log("called")
    try {
        const userDoc = await User.findById(user._id);
        if (userDoc) {
            userDoc.lastLoginAt = new Date();
            await userDoc.save();
        }
    } catch (error) {
        console.error('MongoDB error updating last login:', error);
    }
}
