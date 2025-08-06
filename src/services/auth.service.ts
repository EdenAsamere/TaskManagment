import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

export class AuthService {
    async register(userData: { email: string; password: string; firstName: string; lastName?: string }) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({
            ...userData,
            password: hashedPassword,
        });
        console.log('Registering user:', userData.email);
        return user.save();
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email }).select('+password') as (typeof User) & { _id: any, password: string };
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());
        return { user, accessToken, refreshToken };
    }

    async getAllUsers() {
        const users = await User.find({}, '-password'); // Exclude password field
        return users;
    }
}   

