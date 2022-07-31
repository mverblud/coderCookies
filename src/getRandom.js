console.log("Child Process created", process.pid);

process.on("message", (msg) => {
  console.log("Child Process received message", msg);
  const result = getRandom(msg);
  process.send(result);

  setTimeout(() => {
    process.exit();
  }, 5000);
});

function getRandom(cant) {
  const numeros = [];
  for (let i = 0; i < cant; i++) {
    numeros.push(Math.floor(Math.random() * 1000) + 1);
  }
  //contar cuantas veces salió cada numero
  const contador = numeros.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  return contador;
}

export default getRandom;
