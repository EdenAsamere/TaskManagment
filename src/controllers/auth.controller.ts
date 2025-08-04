import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';


const authservice = new AuthService();
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await authservice.login(email, password);

        // Set refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            data: {
                user,
                accessToken
            }
        });
    } catch (error) {
        let message = 'Login failed';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(401).json({
            message,
        });
    }
}

export const register = async(req:Request, res:Response) =>{
    try{
        const {email, password, firstName, lastName} = req.body;
        const userData = {
            email, password, firstName, lastName
        }
        const result = await authservice.register(userData)
        res.status(200).json({
            message: 'Registration successful',
            data: result,
        });
    }
    catch (error) {
        let message = 'Registration failed';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(401).json({
            message,
        });
    }
}