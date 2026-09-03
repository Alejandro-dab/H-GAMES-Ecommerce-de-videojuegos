//* IMPORTACIONES
/*
mysql2 como driver Node.js -MySQL
promise versión basada en promesas(async/await)
*/
const mysql = require('mysql2/promise');
//dotenv leé el .env y copia al process.env para guardarlas en Node
require('dotenv').config(); 

//* POOL DE CONEXIONES
//Definición y reutilización de conexiones 

const pool = mysql.createPool({
    host: process.env.DB_HOST, //Traemos el valor de DB_HOST de .env con process y guardamos en host
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    connectionLimit: 20, //Limite de conexiones
    waitForConnections: true, //Si, espera por mas conexiones del limite 
    //? Si estuviera el false la conexión 21 fallará al instante 
    queueLimit: 0 //Fila de solicitudes | 0=Infinito
})
module.exports = pool; //Exportamos el pool de conexiones 

//*Comprobación inicial de conexión 
//async como IIFE
(async() => { //Envolvemos en () para agrupar lo que se ejecutara inmediatamente
    try{
        //Pedimos una conexión al pool y la guardamos en conexion 
        const conexion = await pool.getConnection(); 
        console.log('Conexión exitosa');
        conexion.release(); //Liberamos la conexión al pool 
    }
    catch(error){ //Atrapa el error y lo mostrara despues del mensaje en consola 
        console.error('Fallo al conectar con la Base de Datos', error); 
        process.exit(1); //Abortar proceso si falla
    }
})(); //Ejecutamos inmediatamente lo que contiene 
