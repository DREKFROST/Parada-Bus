import React, { useState, useEffect } from "react";
import moment from "moment";
import Clock from "react-live-clock";
import "../styles/paradas.css";
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
            <th>Tiempo Estimado de llegada</th>
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
      <div className="btn-group">
      <button
          className="boton"
          onClick={() => (window.location.href = "/")}
        >
          <h1>Regresar</h1>
        </button>
        </div>
        <div>
          <h3>Made in:</h3>
          <h4>Daniel Llumigusin</h4>
          <h4>Daniela Pilataxi</h4>
          <h4>Dominique Salazar</h4>
          <h4>William León</h4>
        </div>
    </div>
  );
};

export default Paradas;
