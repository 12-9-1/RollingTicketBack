// user.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // Nuevo campo para teléfono
    address: { // Nuevo campo para dirección
        street: { type: String },
        number: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
    },
    profilePicture: { type: String, default: 'https://via.placeholder.com/150' }, // Nuevo campo para foto de perfil
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Rol predeterminado,
}, { timestamps: true });



// Método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Encriptar la contraseña antes de guardarla
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;