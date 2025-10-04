import mongoose, {Schema} from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, 
    permissions: [{ type: String, required: true }], 
    is_admin: { type: Boolean, default: false } 
});

export const Role = mongoose.model('Role', RoleSchema);