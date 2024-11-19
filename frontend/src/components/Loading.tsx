import React from "react";

const Loading: React.FC = () => {
  return (
    <div>
      {/* <h2>Carregando...</h2> */}
      <div className="spinner"></div>
      {/* Opcional: um ícone ou animação */}
    </div>
  );
};

export default Loading;
