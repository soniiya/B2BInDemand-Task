import mongoose, { Schema } from "mongoose";
const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    domain: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, {
    timestamps: true,
    collection: 'organizations'
});
export const Organization = mongoose.model('Organization', OrganizationSchema);
