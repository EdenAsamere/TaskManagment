import { Request, Response } from 'express';
import { verifyRefreshToken, generateAccessToken } from '../utils/token';

export const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required.' });
  }

  try {
    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken) as { id: string };
    // Generate a new access token
    const newAccessToken = generateAccessToken(decoded.id);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token.' });
  }
};
