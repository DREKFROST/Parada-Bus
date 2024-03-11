import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import "../styles/paradas.css";
import imagen_back from "../img/btn-back.png";
import axios from "axios";

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calcularDistancia(
  longitud_parada,
  latitud_parada,
  longitud_bus,
  latitud_bus
) {
  const R = 6371; //Radio de la tierra en KM
  //Calculo de distancia entre dos vectores
  const diferencia_longitud = toRadians(longitud_parada - longitud_bus);
  const diferencia_latitud = toRadians(latitud_parada - latitud_bus);
  //Calcular el modulo del vector Resultante
  const a =
    Math.sin(diferencia_latitud / 2) * Math.sin(diferencia_latitud / 2) +
    Math.cos(toRadians(latitud_parada)) *
      Math.cos(toRadians(latitud_bus)) *
      Math.sin(diferencia_longitud / 2) *
      Math.sin(diferencia_longitud / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c; // Distancia en km
  return distancia;
}

function Tiempo_llegada(
  longitud_parada,
  latitud_parada,
  longitud_bus,
  latitud_bus
) {
  const velocidad_promedio_kmh = 30;

  const distancia = calcularDistancia(
    latitud_parada,
    longitud_parada,
    latitud_bus,
    longitud_bus
  );
  const tiempoHoras = distancia / velocidad_promedio_kmh;

  return tiempoHoras;
}

const Paradas = ({ parada }) => {
  const [datos, setDatos] = useState([]);
  const [ubicacion, setUbicacion] = useState([]);
  const [distancia, setDistancia] = useState([]);
  const [tiempo, setTiempo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseParada = await axios.get(
          "http://localhost:5000/paradas/",
          {
            params: {
              nombre_parada: parada,
            },
          }
        );
        setDatos(responseParada.data);
        console.log(responseParada.data);
        const responseUbicacion = await axios.get(
          "http://localhost:5000/ubicacion/"
        );
        setUbicacion(responseUbicacion.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [parada]);

  useEffect(() => {
    if (datos && ubicacion) {

      
      const distancia = calcularDistancia(
        parseFloat(datos.LATITUD_PARADA),
        parseFloat(datos.LONGITUD_PARADA),
        parseFloat(ubicacion.LATITUD),
        parseFloat(ubicacion.LONGITUD)
      );
      setDistancia(distancia);

      const tiempo = Tiempo_llegada(
        parseFloat(datos.LATITUD_PARADA),
        parseFloat(datos.LONGITUD_PARADA),
        parseFloat(ubicacion.LATITUD),
        parseFloat(ubicacion.LONGITUD)
      );
      setTiempo(tiempo);
    }
  }, [datos, ubicacion]);

  return (
    <div className="content-paradas">
      <div className="btn-parada">
        <button
          className="boton-parada"
          onClick={() => (window.location.href = "/")}
        >
          <img src={imagen_back} alt="" />
        </button>
      </div>
      <div className="titulos-parada">
        <h1>
          <Clock
            format={"DD/MM/YYYY"}
            ticking={true}
            timezone={"America/Guayaquil"}
          />
        </h1>
        <h1 className="reloj">
          <Clock
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"America/Guayaquil"}
          />
        </h1>

        <h3>Bienvenidos a nuestro sistema de transporte</h3>
        <h1>Parada {parada}</h1>
      </div>
      <table className="parada-buses">
        <thead>
          <tr>
            <th>Bus</th>
            <th>Cooperativa</th>
            <th>Distancia</th>
            <th>Aprox.{"(min)"}</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((data, index) => (
            <tr key={index}>
              <td>{data.NUMERO_BUS}</td>
              <td>{data.NOMBRE_COOPERATIVA}</td>
              <td>{String(tiempo)}</td>
              <td>{String(distancia.toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <footer className="footer-nombres">
          <h4>
            Daniel Llumigusin, Daniela Pilataxi, Dominique Salazar, William León
          </h4>
        </footer>
      </div>
    </div>
  );
};

export default Paradas;
