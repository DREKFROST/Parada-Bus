const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5000;

// Configuración de la conexión a MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Llumigusin98*",
  database: "cooperativa",
};

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
  // Ejemplo de consulta a la base de datos
  const parada = req.query.nombre_parada;
  connection.query(
    `SELECT NOMBRE_COOPERATIVA, NOMBRE_PARADA, NUMERO_BUS 
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
