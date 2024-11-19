// config/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const salesRoutes = require("../routes/salesRoutes");

const app = express();

// Middleware
app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json()); // Analisa corpos de requisições JSON

// Conectar ao banco de dados
connectDB();

// Definir rotas
app.use("/api/sales", salesRoutes); // Rotas de vendas

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
