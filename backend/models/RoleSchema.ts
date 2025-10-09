import mongoose, {Schema} from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, 
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }], 
    is_admin: { type: Boolean, default: false } 
});

export const Role = mongoose.model('Role', RoleSchema);