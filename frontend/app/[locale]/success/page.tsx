// src/components/SuccessPage.jsx (o donde organices tus componentes)
import React from "react";

function Page() {
  return (
    <div className="success-container">
      <h1>¡Operación Exitosa!</h1>
      <p>Tu acción se completó con éxito.</p>
      <a href="/" className="success-button">
        Volver al inicio
      </a>
    </div>
  );
}

export default Page;
