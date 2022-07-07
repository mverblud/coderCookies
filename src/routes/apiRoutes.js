import { Router } from "express";

const router = Router();
const users = [];

router.post('/register', (req, res) => {

    //  Si no existe el usuario lo mando a page error
    if (users.some(user => user.name === req.body.nombre)) {
        return res.render('errorRegister')
    }
    //  Guardo en memoria los usarios y redirecciono a login
    users.push(req.body);
    res.render('login');
});

router.post('/login', (req, res) => {

    const {nombre,password} = req.body;

    const user = users.find(user => user.nombre === nombre);
    if (user && user.password === password) {
    //  Guardo session
        for (const key in req.body) {
            req.session[key] = req.body[key];
        }
        res.redirect('/datos')
    } else {
        res.render('errorLogin')
    }

});

router.get('/datos', (req, res) => {
    if (req.session.nombre) {
        res.render('info',{nombre:req.session.nombre})
    }
});

router.get('/logout', (req, res ) => {
    req.session.destroy(err=>{
        res.redirect('/');
    })
});

router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

export default router;
