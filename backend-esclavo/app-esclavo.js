const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5000;

// Configuración de la conexión a MySQL
const dbConfig = {
  host: "DESKTOP-I6IGDOB",
  user: "cooperativa",
  password: "cooperativa",
  database: "cooperativa",
  port:3306
};
host = "DESKTOP-I6IGDOB"

// Conexión a MySQL
const connection = mysql.createConnection(dbConfig);

connection.connect(function (err) {
  if (err) {
    console.error("Error al conectar a MySQL: " + err.stack);
    return;
  }
  console.log("Conectado a MySQL con el ID " + connection.threadId);
});

// Usar el middleware cors
app.use(cors());

app.get("/nombre_paradas", function (req, res) {
  connection.query(
    "SELECT NOMBRE_PARADA FROM parada",
    function (err, result, fields) {
      if (err) {
        console.error("Error al obtener datos de MySQL: " + err.stack);
        res.status(500).send("Error al obtener datos de MySQL");
        return;
      }
      res.json(result);
    }
  );
});

app.get("/paradas", (req, res) => {
  const parada = req.query.nombre_parada;
  connection.query(
    `SELECT NOMBRE_COOPERATIVA, NOMBRE_PARADA, NUMERO_BUS, LATITUD_PARADA, LONGITUD_PARADA
    FROM cooperativa 
    NATURAL JOIN chofer 
    NATURAL JOIN bus 
    NATURAL JOIN parada 
    WHERE NOMBRE_PARADA = '${parada}';`,
    function (err, result, fields) {
      if (err) {
        console.error("Error al obtener datos de MySQL: " + err.stack);
        res.status(500).send("Error al obtener datos de MySQL");
        return;
      }
      res.json(result);
      console.log(result);
    }
  );
});

app.get("/ubicacion", function (req, res) {
  connection.query(
    "SELECT LATITUD, LONGITUD FROM ubicacion ORDER BY id_ubicacion DESC LIMIT 1;",
    function (err, result, fields) {
      if (err) {
        console.error("Error al obtener datos de MySQL: " + err.stack);
        res.status(500).send("Error al obtener datos de MySQL");
        return;
      }
      res.json(result);
      console.log(result);
    }
  );
});

app.get("/registro_ubicacion", (req, res) => {
  const id_bus = req.query.id_bus;
  const id_parada = req.query.id_parada;
  connection.query(
    "SELECT FECHA_UBICACION FROM REGISTRO_UBICACION WHERE id_bus = " +
      id_bus +
      " AND id_parada = " +
      id_parada,
    (err, result) => {
      if (err) {
        console.log("Tiempo no encontrado" + err);
        res.status(500).send("Error interno");
      } else {
        res.json(result);
      }
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});