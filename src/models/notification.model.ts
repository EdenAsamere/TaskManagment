import { Schema, model, Types } from 'mongoose';
import { INotification } from '../interfaces/notification.interface';

const notificationSchema = new Schema<INotification>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['assignment'], required: true },
  relatedTask: { type: Schema.Types.ObjectId, ref: 'Task' },
  relatedIssue: { type: Schema.Types.ObjectId, ref: 'Issue' },
  read: { type: Boolean, default: false },
}, { timestamps: true }
);


export default model<INotification>('Notification', notificationSchema);
