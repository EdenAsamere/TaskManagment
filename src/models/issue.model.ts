import { Schema, model, Types } from 'mongoose';
import { IIssue } from '../interfaces/issues.interface';


const issueSchema = new Schema<IIssue>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
  task: { type: Schema.Types.ObjectId, ref: 'Task' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: { type: Date },
}, 
{ timestamps: true });

export default model<IIssue>('Issue', issueSchema);
export { IIssue };
