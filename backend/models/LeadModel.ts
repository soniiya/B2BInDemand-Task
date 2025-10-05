import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema(
  {
    org_id: { type: String, ref: "Organization" },
    title: { type: String },
    company: { type: String },
    contact_name: { type: String },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    source: {
      type: String,
      enum: ["web", "email", "phone", "referral", "other"],
      default: "web",
    },
    status: {
      type: String,
      enum: ["new", "qualified", "won", "lost"],
      default: "new",
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "leads",
  }
);
export const Lead = mongoose.model("Lead", LeadSchema);
