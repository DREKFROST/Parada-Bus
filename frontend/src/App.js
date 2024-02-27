import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ParadaEspe from "./Paradas/ParadaEspe";
import ParadaSanLuis from "./Paradas/ParadaSanLuis";
import ParadaTriangulo from "./Paradas/ParadaTriangulo";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/espe" element={<ParadaEspe parada={"ESPE"} cooperativa={"Amaguaña"} bus={25} tiempo={"17:20:12"}/>} />
          <Route path="/sanluis" element={<ParadaSanLuis parada={"San Luis"} cooperativa={"Amaguaña"} bus={25} tiempo={"17:25:12"}/>} />
          <Route path="/triangulo" element={<ParadaTriangulo parada={"Triangulo"} cooperativa={"Amaguaña"} bus={25} tiempo={"17:35:12"}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
