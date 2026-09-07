//* Importaciones 
//? Es importante ponerlo antes de que algo dependa del .env
require('dotenv').config(); //Leer el .env 

const conexion = require('./bd/bd'); //Conexión al pool de conexiones
const express = require('express'); //Importar framework de Express
const rutasUsuario = require('./rutas/usuario.rutas'); //usuario.rutas.js 

//* Inicialización 
//Creamos la aplicación express
const app = express(); //El objeto app es el servidor en si 
//Iniciara con el puerto de entorno(asignado por hosting) o en el puerto 3000
const PORT = process.env.PORT || 3000; 

//* Middlewares
// Midleware nativo de Express para leer JSON 
app.use(express.json()); 

//*Conexión de rutas
//? Lleva / antes porque es una ruta virtual, una URL, no un directorio
app.use('/api/usuarios', rutasUsuario); //Endpoint HTTP

//Prueba inicial 
app.get('/', (req, res) => {
    res.send('API de H-Games en línea');
});

//*Activar servidor
//Activamos servidor con el puerto elegido y mandamos un mensaje de consola para confirmar
app.listen(PORT, () => {
    console.log(`=> Servidor de H-Games en puerto ${PORT}`);
});