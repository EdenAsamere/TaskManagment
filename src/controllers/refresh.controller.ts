import { Request, Response } from "express";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils/token";

export const refreshToken = (req: Request, res: Response) => {
  const oldRefreshToken = req.body.refreshToken;
  if (!oldRefreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }

  try {
    const decoded = verifyRefreshToken(oldRefreshToken) as { id: string };

    // issue new tokens
    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken, // 👈 rotate refresh token
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }
};
