//* Importaciones 
const conexion = require('../backend/bd/bd'); //Conexión al pool de conexiones
const express = require('express'); //Importar framework de Express
const rutasUsuario = require('../backend/rutas/usuario.rutas'); //usuario.rutas.js 

require('dotenv').config(); //Leer el .env 

//* Inicialización 
//Creamos la aplicación express
const app = express(); //El objeto app es el servidor en si 
//Iniciara con el puerto de entorno(asignado por hosting) o en el puerto 3000
const PORT = process.env.PORT || 3000; 

//* Middlewares
// Midleware nativo de Express para leer JSON 
app.use(express.json()); 

//*Conexión de rutas
app.use('api/usuarios', rutasUsuario); //Endpoint HTTP

//Prueba inicial 
app.get('/', (req, res) => {
    res.send('API de H-Games en línea');
});

//*Activar servidor
//Activamos servidor con el puerto elegido y mandamos un mensaje de consola para confirmar
app.listen(PORT, () => {
    console.log(`=> Servidor de H-Games en puerto ${PORT}`);
});