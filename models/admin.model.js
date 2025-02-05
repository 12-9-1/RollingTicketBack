// admin.model.js (nuevo archivo)
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;

