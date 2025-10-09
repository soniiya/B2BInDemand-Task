import {User}  from '../models/UserModel.js';
import { Role } from '../models/RoleSchema.js';
import { UserType, RoleType } from '../types/User.js';
import bcrypt from 'bcrypt';

type UserWithoutRefs = Omit<UserType, "role_id">;

export interface PopulatedUser extends UserWithoutRefs {
    role_id: RoleType; 
}

interface SignUpPayload { email: string; password: string; name: string; }

export const signUp = async (payload: SignUpPayload): Promise<PopulatedUser | null> => {
    const { email, password, name } = payload;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return null; 
        }
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const AdminRole = await Role.findOne({ name: 'Admin' });

        if (!AdminRole) {
        throw new Error("Default role 'SuperAdmin' not found.");
        }

        const newUser = new User({
            name,
            email,
            passwordHash: passwordHash, 
            role_id: AdminRole._id
        });
        
        const savedUser = await newUser.save();
        await savedUser.populate([
        { path: 'role_id', select: 'name permissions' }
        ]);
        return savedUser as unknown as PopulatedUser
    } 
    catch (error) {
        console.error('MongoDB error during user sign up:', error);
        throw new Error('Failed to create user account.');
    }
};

export const getUserByEmailWithHash = async (email: string): Promise<PopulatedUser | null> => {
    try {
        const user = await User.findOne({ email }).select('+passwordHash').populate({
                path: 'role_id', 
                select: 'name permissions' ,
                populate: {
                    path: 'permissions',
                    select: 'name' 
                }
            });;
        return user as PopulatedUser | null;
    } catch (error) {
        console.error('MongoDB error during user retrieval:', error);
        return null;
    }
};


export const updateLastLogin = async (user: PopulatedUser): Promise<void> => {
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
