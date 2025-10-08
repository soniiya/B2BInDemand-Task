import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();

const jwt_secret = process.env.JWT_SECRET

export const issueTokenAndSetCookie = (res: Response, payload: JwtPayload): string => {
  if(!jwt_secret) throw "jwt token not present"

  const token = jwt.sign(payload, jwt_secret, { expiresIn: '5h' });

  res.cookie('jwt', token, {
    httpOnly: true, 
    secure: false, 
    sameSite: 'lax', 
    maxAge: 24 * 60 * 60 * 1000, 
  });

  return token;
};


export const verifyToken = (token: string): JwtPayload | null => {
  if(!jwt_secret) throw "jwt token not present"
  
  try {
    return jwt.verify(token, jwt_secret) as JwtPayload;
  } catch (err) {
    return null;
  }
};
