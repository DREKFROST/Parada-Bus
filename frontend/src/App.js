import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Parada from "./Paradas/ModelParada";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [paradas, setParadas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/nombre_paradas");
        setParadas(response.data);
        console.log(paradas);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {paradas.map((parada, index) => (
            <Route
              key={index}
              path={"/" + parada.NOMBRE_PARADA}
              element={<Parada nombre_parada={parada.NOMBRE_PARADA}/>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
