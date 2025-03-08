import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extend the Express Request interface to include user information
export interface AuthRequest extends Request {
  user?: { id: number }; // Add user property to the request object
}

// Middleware to authenticate user using JWT token
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

  // Check if token exists
  if (!token) {
    res.status(401).json({ error: 'Authentication required', message: 'No token provided' });
    return;
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    // Attach user ID to the request object for পরবর্তী controllers to access
    (req as AuthRequest).user = { id: decoded.userId };
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    // If token verification fails, return 401 Unauthorized error
    res.status(401).json({ error: 'Invalid token', message: 'Token verification failed' });
  }
};
