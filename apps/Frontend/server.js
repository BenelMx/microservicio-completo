const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root', // Asegúrate de usar el nombre de usuario correcto
    password: '', // Asegúrate de usar la contraseña correcta
    database: 'productos' // Asegúrate de que este es el nombre correcto de la base de datos
};

let connection;
mysql.createConnection(dbConfig).then(conn => {
    connection = conn;
    console.log('Conexión a la base de datos establecida');
}).catch(error => {
    console.error('Error al conectar a la base de datos:', error);
});

app.get('/productos', async (req, res) => {
    try {
        const [rows, fields] = await connection.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
