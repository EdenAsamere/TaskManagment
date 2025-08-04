import { Request, Response } from "express";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils/token";

export const refreshToken = (req: Request, res: Response) => {
  const oldRefreshToken = req.cookies.refreshToken; // <-- get from cookie
  if (!oldRefreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }

  try {
    const decoded = verifyRefreshToken(oldRefreshToken) as { id: string };

    // issue new tokens
    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    // Set new refresh token in http-only cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      accessToken: newAccessToken
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }
};
