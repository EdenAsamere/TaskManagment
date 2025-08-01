import { Types } from "mongoose";

export interface ITodoList {
    title: string;
    description?: string;
    project?: Types.ObjectId;
    createdBy: Types.ObjectId;
}