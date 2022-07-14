import mongoose from "mongoose";

mongoose.connect(
    'mongodb+srv://mverblud:OKsEHOlsWDvPBHej@mverblud.pawqn.mongodb.net/coderSession?retryWrites=true&w=majority'
)
    .then(response => console.log('Conectado a la BD'))
    .catch(err => console.log(err))