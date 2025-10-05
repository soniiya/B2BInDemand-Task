import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    status: { type: String, enum: ['active', 'pending'], default: 'active' },
    role_id: {
        type: String,
        ref: 'Role',
        required: true
    },
    lastLoginAt: { type: Date, default: null },
}, {
    timestamps: true,
    collection: 'users'
});
export const User = mongoose.model('User', UserSchema);
