import React from "react";
import "../styles/fondo.css";

const Home = () => {
  return (
    <div className="container-home">
      <div className="Titulos">
        <h1>Bienvenido a nuestro sistema de información de buses</h1>
      </div>
      <div className="btn-group">
        <button
          className="boton"
          onClick={() => (window.location.href = "/espe")}
        >
          <h1>Parada ESPE</h1>
        </button>
        <button
          className="boton"
          onClick={() => (window.location.href = "/sanluis")}
        >
          <h1>Parada San Luis</h1>
        </button>
        <button
          className="boton"
          onClick={() => (window.location.href = "/triangulo")}
        >
          <h1>Parada Triángulo</h1>
        </button>
      </div>
    </div>
  );
};

export default Home;
