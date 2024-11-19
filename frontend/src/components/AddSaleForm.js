// /src/components/AddSaleForm.js
import React, { useState } from "react";

function AddSaleForm({ addSale }) {
  const [month, setMonth] = useState("");
  const [sales, setSales] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!month || !sales) {
      alert("Preencha todos os campos");
      return;
    }

    const newSale = {
      month,
      sales: parseInt(sales),
    };

    addSale(newSale); // Chama a função de adicionar venda do App.js
    setMonth(""); // Limpa o campo mês
    setSales(""); // Limpa o campo vendas
  };

  return (
    <section>
      <h2>Adicionar Nova Venda</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="month">Mês:</label>
        <input
          type="text"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <label htmlFor="sales">Número de Vendas:</label>
        <input
          type="number"
          id="sales"
          value={sales}
          onChange={(e) => setSales(e.target.value)}
          required
        />
        <button type="submit">Adicionar Venda</button>
      </form>
    </section>
  );
}

export default AddSaleForm;
