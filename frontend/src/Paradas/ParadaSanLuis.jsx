import React from "react";
import Paradas from "../pages/Paradas";
const ParadaSanLuis = (prompt) => {
  const { parada, bus, cooperativa, tiempoLlegada } = prompt;
  return <Paradas parada={parada} bus={bus} cooperativa={cooperativa} tiempo={tiempoLlegada} />;
};

export default ParadaSanLuis;