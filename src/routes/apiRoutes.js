import { Router } from "express";
import passport from 'passport';
import os from 'os';
import compression from "compression";
import logger from "../../logger.js";

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
    logger.info(`ruta: /errorRegister metodo: ${req.method}`);
    res.render('errorRegister');
})

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/errorLogin',
    successRedirect: '/datos'
}));

router.get('/errorLogin', (req, res) => {
    logger.info(`ruta: /errorLogin metodo: ${req.method}`);
    res.render('errorLogin')
})

router.get('/datos', isAuth, (req, res) => {
    logger.info(`ruta: /datos metodo: ${req.method}`);
    res.render('info',{nombre:req.user.nombre})
});

router.get('/logout', (req, res) => {
    logger.info(`ruta: /logout metodo: ${req.method}`);
    req.session.destroy(err => {
        res.redirect('/');
    })
});

router.get('/', (req, res) => {
    logger.info(`ruta: / metodo: ${req.method}`);
    res.render('login')
})

router.get('/register', (req, res) => {
    logger.info(`ruta: /register metodo: ${req.method}`);
    res.render('register')
})

router.get('/info', (req, res) => {

    logger.info(`ruta: /info metodo: ${req.method}`);

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

router.get('/infozip',compression() ,(req, res) => {

    logger.info(`ruta: /infozip metodo: ${req.method}`);

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

router.get('/infolog',compression() ,(req, res) => {

    logger.info(`ruta: /infozip metodo: ${req.method}`);

    const infoProcess = {
        argumentos : process.argv,
        platform : process.platform,
        version : process.version,
        memory : process.memoryUsage(),
        path : process.cwd(),
        id: process.pid,
        procesadores: numProcesadores
    }

    console.log(infoProcess);

   // res.end(JSON.stringify(infoProcess))
    res.render('infoProcess',{infoProcess})
})

export default router;
