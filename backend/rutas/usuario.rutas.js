//* Importaciones 
const express = require('express') //Importamos el modulo de Express

//Mini-servidor express
//? Evita saturar el inde.js con URLs
const router = express.Router();

//Extraemos la función registrarUsuario de usuario.controlador.js 
const {registrarUsuario} = require('../controladores/usuario.controlador');

//Definición del endpoint para ser llamado por el cliente 
router.post('/registro', registrarUsuario); //Endpoint HTTP

//Exportación del modulo router para usarlo en index.js 
//? Al hacer el modulo publico puede ser usado por cualquier archivo que lo importe 
module.exports = router; 