import { Router } from "express";
import { fork } from 'child_process';

const router = Router();

let visitas = 0;

router.get('/', (req, res) => {

    const compute = fork('computo.js');
    compute.send('start');
    compute.on('message', sum => {
        res.end(`Sum is ${sum}`);
    });
})

/* const calculo = (cant = 6e9) => {

    console.log(cant);

    let suma = 0;
    for (let i = 0; i < cant; i++) {
        suma += i;
    }
    return suma;
} */

router.get('/visita', (req, res) => {
    res.end('ok' + (++visitas))
})

export default router;
