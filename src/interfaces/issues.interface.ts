import { Types } from "mongoose";

export interface IIssue {
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  task?: Types.ObjectId;
  project?: Types.ObjectId;
  reportedBy: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  createdAt?: Date;
  resolvedAt?: Date;
}
