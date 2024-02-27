import React from "react";
import Paradas from "../pages/Paradas";

const ParadaTriangulo = ({ parada, bus, cooperativa, tiempo }) => {
  return (
    <Paradas
      parada={parada}
      bus={bus}
      cooperativa={cooperativa}
      tiempo={tiempo}
    />
  );
};

export default ParadaTriangulo;
