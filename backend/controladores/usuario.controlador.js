//* Importaciones
const conexion = require('../bd/bd'); //Pool de conexiones 

const bcrypt = require('bcrypt'); //Algoritmo hashing para contraseñas 

//* Registrar Uusario 
const registrarUsuario = async (peticion, respuesta) => { 
    try{
        const {nombre_usuario, email, password_usuario} = peticion.body; 
        
        if(!email || !password_usuario){
            return respuesta.status(400).json({
                error: 'Error en Usuario o Contraseña'
            });
        }
        
        const password_hasheada = await bcrypt.hash(password_usuario, 10); 

        const consulta = 
        'INSERT INTO USUARIOS(nombre_usuario, email, password_usuario, rol) VALUES (?,?,?,?)';
        
        const [resultado] = await conexion.query(consulta,
            [
            nombre_usuario, 
            email, 
            password_hasheada,
            false //False será automaticamente agregado como rol al crear un registro
            ]
        ) 

        return respuesta.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            id: resultado.insertId
        });
    }catch(error){

        if (error.code === 'ER_DUP_ENTRY') {
            return respuesta.status(409).json({ 
                error: 'El correo ya está registrado' 
            });
        }
        console.error(error);
        return respuesta.status(500).json({
            error: 'Error al registrar usuario'
        });
    }
};

module.exports = { registrarUsuario }; //Exportarlo para usarlo en usuario.rutas.js