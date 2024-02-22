import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ParadaEspe from "./Paradas/ParadaEspe";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/espe" element={<ParadaEspe parada={"ESPE"} cooperativa={"Amaguaña"} bus={25} tiempo={("01:20:12")}/>} />
          <Route path="/sanluis" element={<ParadaEspe parada={"San Luis"}/>} />
          <Route path="/triangulo" element={<ParadaEspe parada={"Triangulo"}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
