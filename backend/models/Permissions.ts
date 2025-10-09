import mongoose, {Schema} from "mongoose";

const PermissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, 
    description: { type: String },
});

export const Permission = mongoose.model('Permission', PermissionSchema);