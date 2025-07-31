import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';


const authservice = new AuthService();
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authservice.login(email, password);
        res.status(200).json({
            message: 'Login successful',
            data: result,
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