import { Router } from "express";
import passport from 'passport';
import os from 'os';

const numProcesadores = os.cpus().length;
const router = Router();

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('login');
    }
}

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/errorRegister',
    successRedirect: '/datos'
}));

router.get('/errorRegister', (req, res) => {
    res.render('errorRegister')
})

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/errorLogin',
    successRedirect: '/datos'
}));

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

router.get('/datos', isAuth, (req, res) => {
    res.render('info',{nombre:req.user.nombre})
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    })
});

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/info', (req, res) => {

    const infoProcess = {
        argumentos : process.argv,
        platform : process.platform,
        version : process.version,
        memory : process.memoryUsage(),
        path : process.cwd(),
        id: process.pid,
        procesadores: numProcesadores
    }
   // res.end(JSON.stringify(infoProcess))
    res.render('infoProcess',{infoProcess})
})

export default router;
