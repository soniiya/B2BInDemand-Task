import mongoose, { Schema } from "mongoose";
const ProjectSchema = new Schema({
    org_id: { type: String, ref: "Organization", required: true },
    name: { type: String, required: true },
    client: { type: String },
    status: { type: String, enum: ["pending", "active", "completed"], default: "pending" },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true,
    collection: 'projects'
});
export const Project = mongoose.model('Project', ProjectSchema);
