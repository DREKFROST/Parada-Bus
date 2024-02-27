import React from "react";
import "../styles/fondo.css";

const Home = () => {
  return (
    <div className="container-home">
      <div className="Titulos">
        <h1>Bienvenido a nuestro sistema de información de buses</h1>
      </div>
      <button className="boton">
        <h1>Parada ESPE</h1>
      </button>
      <button className="boton">
        <h1>Parada SAN LUIS</h1>
      </button>
    </div>
  );
};

export default Home;

