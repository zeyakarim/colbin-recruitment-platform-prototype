import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

// Extend the Request object with a user property
export interface AuthRequest extends Request {
    user?: {
        id: number;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Check for JWT secret existence
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined in environment variables.');
        return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // 2. Extract the token safely
    const authHeader = req?.headers?.authorization;
    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authentication failed: No token or invalid format' });
    }

    const token = authHeader?.split(' ')[1];

    try {
        // 3. Verify the token with specific error handling
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { id: number };

        // 4. Attach the user object with the correct type (number)
        req.user = { id: decodedToken.id };
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Authentication failed: Token expired' });
        }
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ success: false, message: 'Authentication failed: Invalid token' });
        }
        // Handle any other unexpected errors
        return res.status(500).json({ success: false, message: 'An unexpected error occurred during authentication' });
    }
};