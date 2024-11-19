// routes/salesRoutes.js
const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

// Rota para obter as vendas
router.get("/", salesController.getSales);

// Rota para adicionar uma venda
router.post("/", salesController.addSale);

module.exports = router;
