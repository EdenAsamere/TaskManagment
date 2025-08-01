import { Schema, model} from 'mongoose';
import { ITodoList } from '../interfaces/todolist.interface';

const todoListSchema = new Schema<ITodoList>({
    title: { type: String, required: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const TodoList = model<ITodoList>('TodoList', todoListSchema);
