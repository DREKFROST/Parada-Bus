const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 5000;

// Configuración de la conexión a Oracle
const dbConfig = {
  user: 'cooperativa',
  password: 'cooperativa',
  connectString: 'localhost:1521/ORCL'
};

// Conexión a Oracle
oracledb.getConnection(dbConfig, function (err, connection) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Conectado a Oracle');

  // Ruta de ejemplo para obtener datos de Oracle
  app.get('/cooperativa', (req, res) => {
    // Ejemplo de consulta a la base de datos
    connection.execute('SELECT * FROM cooperativa', [], (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error al obtener datos de Oracle');
        return;
      }
      res.json(result.rows);
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
