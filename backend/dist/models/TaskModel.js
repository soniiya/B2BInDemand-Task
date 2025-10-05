import mongoose, { Schema } from "mongoose";
const TaskSchema = new Schema({
    project_id: { type: String, ref: "Project" },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["todo", "in_progress", "done"], default: "todo" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    assignee_user_id: { type: Schema.Types.ObjectId, ref: "User" },
    due_date: { type: Date },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true,
    collection: 'tasks'
});
export const Task = mongoose.model('Task', TaskSchema);
