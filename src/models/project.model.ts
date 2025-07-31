import { model, Schema } from "mongoose";
import { IProject } from "../interfaces/project.interface";


const projectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    startDate: { type: Date, required: true },
    deadline: { type: Date },
    status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
}, { timestamps: true });



projectSchema.index({ manager: 1, status: 1 });
projectSchema.index({ teamMembers: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ deadline: 1 });

export default model<IProject>("Project", projectSchema);
