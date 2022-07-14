import express from "express";
import session from "express-session";
import apiRoutes from "./src/routes/apiRoutes.js";
import MongoStore from "connect-mongo";
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
    cookie: {maxAge: 600000}, // 10 minutos = 600000 milisegundos
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://mverblud:OKsEHOlsWDvPBHej@mverblud.pawqn.mongodb.net/sessionMongoAtlas?retryWrites=true&w=majority' })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', apiRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Esuchando el puerto ${PORT}`);
});