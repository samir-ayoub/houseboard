// /src/components/SalesList.js
import React from "react";

function SalesList({ sales }) {
  return (
    <section>
      <h2>Vendas por Mês</h2>
      <div id="sales-list">
        {sales.map((sale) => (
          <div key={sale._id} className="sales-item">
            <strong>{sale.month}</strong>: {sale.sales} vendas
          </div>
        ))}
      </div>
    </section>
  );
}

export default SalesList;
