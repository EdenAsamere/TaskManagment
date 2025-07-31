import { Schema, Document } from "mongoose";

export interface IProject extends Document {
    name: string;
    description?: string;
    manager: Schema.Types.ObjectId;
    teamMembers: Schema.Types.ObjectId[];
    startDate: Date;
    deadline?: Date;
    status: "pending" | "in_progress" | "completed";
}


