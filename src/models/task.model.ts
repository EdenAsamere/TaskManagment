import { Schema, model} from 'mongoose';
import { ITask } from '../interfaces/task.interface';

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  startDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
}, { timestamps: true });


taskSchema.index({ project: 1 });
taskSchema.index({ assignedTo: 1 });

export default model<ITask>('Task', taskSchema);
