// index.js

const express = require("express");
const app = express();
const port = 3000;

// Dados fictícios de vendas
const salesData = [
  { month: "Jan", sales: 1000 },
  { month: "Feb", sales: 1500 },
  { month: "Mar", sales: 2000 },
];

app.get("/api/sales", (req, res) => {
  res.json(salesData);
});

app.get("/", (req, res) => {
  res.send("Olá, Mundo!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
