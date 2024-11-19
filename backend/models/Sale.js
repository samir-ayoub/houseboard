// models/Sale.js
const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Sale", SaleSchema);
