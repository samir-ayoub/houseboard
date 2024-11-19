// controllers/salesController.js
const Sale = require("../models/Sale");

// Função para obter todas as vendas
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};

// Função para adicionar uma venda
const addSale = async (req, res) => {
  const { month, sales } = req.body;

  try {
    const newSale = new Sale({ month, sales });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar venda");
  }
};

module.exports = {
  getSales,
  addSale,
};
