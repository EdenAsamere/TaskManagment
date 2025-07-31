import { Types } from "mongoose";

export interface ITask {
  name: string;
  description?: string;
  project: Types.ObjectId;
  createdBy: Types.ObjectId;
  assignedTo?: [Types.ObjectId];
  status: 'pending' | 'in_progress' | 'completed';
  startDate?: Date;
  dueDate?: Date;
}