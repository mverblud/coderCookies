import { Router } from "express";
import { fork } from 'child_process';

const router = Router();

let visitas = 0;

/* router.get('/', (req, res) => {

    const compute = fork('computo.js');
    compute.send('start');
    compute.on('message', sum => {
        res.end(`Sum is ${sum}`);
    });
}) */

router.get("/randoms", (req, res) => {
  //http://localhost:3000/api/randoms?cant=1000
  const cant = req.query.cant || 100000000;
  const child = fork("./src/getRandom.js");
  child.send(cant);
  child.on("message", (msg) => {
    res.send(msg);
  });

  child.on("exit", (code) => {
    console.log("Se ha cerrado el proceso", code);
  });
});

router.get('/visita', (req, res) => {
  res.end('ok' + (++visitas))
})

export default router;
