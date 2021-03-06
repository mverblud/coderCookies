import express from "express";
import session from "express-session";
import apiRoutes from "./src/routes/apiRoutes.js";
import apiRandoms from "./src/routes/apiRandoms.js";
import MongoStore from "connect-mongo";
import 'dotenv/config'
import './src/db/database.js';
import './src/passport/local.js'
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secretKey',
    cookie: { maxAge: 600000 }, // 10 minutos = 600000 milisegundos
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL_SESSION })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', apiRoutes);

app.use('/randoms', apiRandoms);

// Si no recibo puerto por defecto puerto 8080
const PORT =  process.argv[2] || 8080;
app.listen(PORT, () => {
    console.log(`Esuchando el puerto ${PORT}`);
});