import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }

  try {
    const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
    if (!ACCESS_SECRET) {
      res.status(500).json({ message: "Server configuration error: ACCESS_TOKEN_SECRET is not set." });
      return;
    }

    const decoded = jwt.verify(token, ACCESS_SECRET) as { id: string };
    (req as AuthRequest).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
