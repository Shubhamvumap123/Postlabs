import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import process from 'node:process';

export interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (_err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
