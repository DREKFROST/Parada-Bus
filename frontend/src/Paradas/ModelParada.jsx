import React from "react";
import Paradas from "../pages/Paradas";

const ModelParada = ({ nombre_parada }) => {
  return <Paradas parada={nombre_parada}  />;
};

export default ModelParada;
