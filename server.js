import express from "express";
import session from "express-session";
//import sessionFileStore from "session-file-store";
import apiRoutes from "./src/routes/apiRoutes.js";
import MongoStore from "connect-mongo";
//import './src/db/database.js';

const app = express();
//const fileStore = sessionFileStore(session)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secretKey',
    store: MongoStore.create({mongoUrl:'mongodb+srv://mverblud:OKsEHOlsWDvPBHej@mverblud.pawqn.mongodb.net/sessionMongoAtlas?retryWrites=true&w=majority'})
}));

app.use('/', apiRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Esuchando el puerto ${PORT}`);
});