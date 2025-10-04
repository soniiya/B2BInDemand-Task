import { Request, Response } from 'express';
import { signUp, getUserByEmailWithHash, updateLastLogin } from '../services/authService.js';
import { issueTokenAndSetCookie } from '../utils/authUtils.js';
import bcrypt from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken';
import { RoleType, UserType } from '../types/User.js';
import { PopulatedUser } from '../services/authService.js'


export const signupController = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        res.status(400).json({ message: 'Missing required fields: email, password, name.' });
        return;
    }

    try {
        const newUser = await signUp({ email, password, name });

        if (!newUser) {
            res.status(409).json({ message: 'User with this email already exists.' });
            return;
        }

        const jwtPayload = {
            userId: newUser._id.toString(),
            role: [newUser.role] 
        };
        issueTokenAndSetCookie(res, jwtPayload as JwtPayload); 

        res.status(201).json({ 
            message: 'User registered successfully and logged in.',
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: (error as Error).message || 'Internal server error during registration.' });
    }
};

// export const loginController = async (req: Request, res: Response): Promise<void> => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(400).json({ message: 'Missing required fields: email, password.' });
//         return;
//     }

//     try {
//         const user = await getUserByEmailWithHash(email);

//         if (!user) {
//             res.status(401).json({ message: 'Invalid email or password.' });
//             return;
//         }
        
//         const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

//         if (!isPasswordValid) {
//             res.status(401).json({ message: 'Invalid email or password.' });
//             return;
//         }

        
//         updateLastLogin(user);

//         const jwtPayload = {
//             userId: user._id.toString(),
//             role: [user.role] 
//         };
//         issueTokenAndSetCookie(res, jwtPayload as any);

//         res.status(200).json({
//             message: 'Login successful.',
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ message: (error as Error).message || 'Internal server error during login.' });
//     }
// };


export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Missing required fields: email, password.' });
        return;
    }

    try {
        const user: PopulatedUser | null = await getUserByEmailWithHash(email);

        console.log("user", user)

        if (!user) {
            console.log("called this")
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        console.log("pass", user.passwordHash)
        
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            console.log("password", isPasswordValid)
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        updateLastLogin(user);

        const userRole: RoleType = user.role_id; 

        const jwtPayload = {
            userId: user._id.toString(),
            orgId: user.organization_id.toString(), 
            roleName: userRole.name,            
            permissions: userRole.permissions,   
        };

        issueTokenAndSetCookie(res, jwtPayload as any);

        res.status(200).json({
            message: 'Login successful.',
            user: {
                id: user._id,
                email: user.email,
                roleName: userRole.name,
                organizationId: user.organization_id,
                permissions: userRole.permissions, 
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
