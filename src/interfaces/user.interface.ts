import { Document } from 'mongoose';

export interface IUserInterface extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    // isActive: boolean;

    

}

