import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    contraseña: String,
    email: String
});

export default mongoose.model('usuarios',usuarioSchema);