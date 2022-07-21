import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(
    process.env.MONGO_DB
)
    .then(response => console.log('Conectado a la BD'))
    .catch(err => console.log(err))