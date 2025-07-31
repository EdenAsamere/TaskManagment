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
        res.status(401).json({
            message: error.message || 'Login failed',
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
        res.status(401).json({
            message: error.message || 'Registration failed',
        });
    }
}