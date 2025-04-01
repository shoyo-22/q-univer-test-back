import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwt.utils';

// Define a custom request interface
interface CustomRequest extends ExpressRequest {
  user?: any; // Replace 'any' with your specific type
}

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}