import { Request, Response } from 'express';
import { signUp, getUserByEmailWithHash, updateLastLogin } from '../services/authService.js';
import { issueTokenAndSetCookie } from '../utils/authUtils.js';
import bcrypt from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken';
import { RoleType } from '../types/User.js';
import { PopulatedUser } from '../services/authService.js'


export const signupController = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        res.status(400).json({ message: 'Missing required fields: email, password, name.' });
        return;
    }

    try {
       const newUser: PopulatedUser | null = await signUp({ email, password, name }); 

        if (!newUser) {
            res.status(409).json({ message: 'User with this email already exists.' });
            return;
        }

        const userRole: RoleType = newUser.role_id;

        const jwtPayload = {
            userId: newUser._id.toString(),
            roleName: userRole.name,                    
            permissions: userRole.permissions,         
        };

        issueTokenAndSetCookie(res, jwtPayload as JwtPayload); 

        res.status(201).json({ 
            message: 'User registered successfully and logged in.',
            user: {
                userId: newUser._id,
                email: newUser.email,
                roleName: userRole.name,
                permissions: userRole.permissions, 
            }
        });

    } catch (error) {
        res.status(500).json({ message: (error as Error).message || 'Internal server error during registration.' });
    }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Missing required fields: email, password.' });
        return;
    }

    try {
        const user: PopulatedUser | null = await getUserByEmailWithHash(email);

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        updateLastLogin(user);

        const userRole: RoleType = user.role_id; 
        const permissionNames: string[] = userRole.permissions.map(
            (perm: any) => perm.name 
        );
        
        console.log("Permissions in JWT Payload:", permissionNames);


        const jwtPayload = {
            userId: user._id.toString(),
            roleName: userRole.name,            
            permissions: permissionNames,   
        };

        issueTokenAndSetCookie(res, jwtPayload as any);

        res.status(200).json({
            message: 'Login successful.',
            user: {
                id: user._id,
                email: user.email,
                roleName: userRole.name,
                permissions: permissionNames, 
            }
        });

    } catch (error) {
        res.status(500).json({ message: (error as Error).message || 'Internal server error during login.' });
    }
};


export const logoutController = (req: Request, res: Response): void => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logout successful.' });
};
