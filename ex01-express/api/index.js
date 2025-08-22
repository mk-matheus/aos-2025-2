const dotenv = require ("dotenv/config");
const express = require( "express");

console.log("Olá, Turma!");
console.log("MY_SECRET", process.env.MY_SECRET);
console.log("PYTHON_ROOT", process.env.PYTHON_ROOT);

const app = express();

app.get("/", (req, res) => {
  res.send("Bem-vinde ao Expresss by Matheus");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});