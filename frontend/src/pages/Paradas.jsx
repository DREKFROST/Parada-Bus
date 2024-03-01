import React, { useState, useEffect } from "react";
import moment from "moment";
import Clock from "react-live-clock";
import "../styles/paradas.css";
import imagen_back from "../img/btn-back.png";
const Paradas = ({ parada, bus, cooperativa, tiempo }) => {
  const [diferenciaMinutos, setDiferenciaMinutos] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const horaActual = moment().tz("America/Guayaquil");
      const horaLlegada = moment.tz(tiempo, "HH:mm:ss", "America/Guayaquil");
      const diffMinutos = horaLlegada.diff(horaActual, "minutes");
      setDiferenciaMinutos(diffMinutos);
    }, 1000);

    return () => clearInterval(interval);
  }, [tiempo]);

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
            <th>Hora llegada</th>
            <th>Aprox.{"(min)"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{bus}</td>
            <td>{cooperativa}</td>
            <td>{tiempo}</td>
            <td>{diferenciaMinutos > 0 ? diferenciaMinutos : "Ya se paso"}</td>
          </tr>
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
