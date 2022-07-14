import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from '../models/usuarios.js';
import bcrypt from 'bcryptjs';

const LocalStrategy = Strategy;

passport.use('register', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre, password, done) => {

    const usuarioBD = await Usuarios.findOne({ nombre });
    if (usuarioBD) {
        return done(null, false);
    }

    // Creo nuevo usuario y encripto password
    const usuarioNuevo = new Usuarios();
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);

    usuarioNuevo.nombre = nombre;
    usuarioNuevo.contraseña = bcrypt.hashSync(password, salt);;
    await usuarioNuevo.save();
    done(null, usuarioNuevo);
}
))

passport.use('login', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre, password, done) => {

    const usuarioBD = await Usuarios.findOne({ nombre });
    if (!usuarioBD) {
        return done(null, false);
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuarioBD.contraseña)
    if (!validPassword) {
        return done(null, false);
    }

    done(null, usuarioBD);
}
))

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
})

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuarios.findById(id);
    done(null, usuario);
})
