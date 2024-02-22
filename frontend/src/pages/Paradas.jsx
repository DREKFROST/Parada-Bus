import React, { useState, useEffect } from "react";
import moment from "moment";
import Clock from "react-live-clock";

const Paradas = ({ parada, bus, cooperativa, tiempo }) => {
  const [diferenciaMinutos, setDiferenciaMinutos] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
        const horaActual = moment().tz('America/Guayaquil');
        const horaLlegada = moment.tz(tiempo, 'HH:mm:ss', 'America/Guayaquil');
        const diffMinutos = horaLlegada.diff(horaActual, "minutes");        
      setDiferenciaMinutos(diffMinutos);
    }, 30000); 

    return () => clearInterval(interval);
  }, [tiempo]);

  return (
    <div>
      <h1>Fecha</h1>      
      <h1><Clock format={"DD/MM/YYYY"} ticking={true} timezone={"America/Guayaquil"} /></h1>
      <h2>
        Hora: 
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"America/Guayaquil"} />
      </h2>
      <h1>Bienvenidos a nuestro sistema de transporte</h1>
      <h2>Parada {parada}</h2>

      <table className="parada-buses">
        <thead>
          <tr>
            <th>Bus</th>
            <th>Cooperativa</th>
            <th>Tiempo Estimado de llegada</th>
            <th>Aprox.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{bus}</td>
            <td>{cooperativa}</td>
            <td>{tiempo}</td>
            <td>{diferenciaMinutos !== null ? diferenciaMinutos : "-"}</td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Paradas;
