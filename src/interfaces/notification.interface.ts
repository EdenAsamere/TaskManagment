import { Types } from "mongoose";

export interface INotification {
  user: Types.ObjectId;
  message: string;
  type: 'assignment' | 'deadline_update' | 'status_change' | 'issue_update';
  relatedTask?: Types.ObjectId;
  relatedIssue?: Types.ObjectId;
  read: boolean;
  createdAt?: Date;
}