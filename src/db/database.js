import mongoose from "mongoose";
import 'dotenv/config';
import logger from "../../logger.js";


mongoose.connect(
    process.env.MONGO_DB
)
    .then(response => logger.info('Conectado a la BD'))
    .catch(err => logger.error(`error al conecta a la BD ${err}`))