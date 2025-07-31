import { Schema, model } from 'mongoose';
import { IUserInterface } from '../interfaces/user.interface';

const user = new Schema<IUserInterface>({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email number is required'],
        select: true,
    },
    password: {
        type: String,
        minlength: [8, 'Password should have at least 8 characters'],
        required: [true, 'Password is required'],
        select: false,
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName:{
        type: String
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/do8dofq26/image/upload/v1748794251/profile_pictures/default_profile_pic.png',
    },
},
{
    timestamps: true,
});

export default model<IUserInterface>('User', user);
