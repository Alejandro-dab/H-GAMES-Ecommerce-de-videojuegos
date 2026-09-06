//* Importaciones
const conexion = require('../bd/bd'); //Pool de conexiones 

const bcrypt = require('bcrypt'); //Algoritmo hashing para contraseñas 

//* Registrar Usuario 
//req: petición del cliente 
//res: respuesta del servidor 
const registrarUsuario = async (req, res) => { 
    try{
        //Extrae 3 propiedades de parte del cliente 
        const {nombre_usuario, email, password_usuario} = req.body; //Destructuración con propiedad body
        
        //Si el email o la contraseña son datos: diferentes, nulos o indefinidos 
        if(!email || !password_usuario){ 
            return res.status(400).json({ //Error solicitud de cliente incorrecta
                error: 'Error en Usuario o Contraseña'
            });
        }
        
        //Hasheo de la contraseña con potencial a la 10
        // await pausa el proceso hasta que termine el hasheo 
        const password_hasheada = await bcrypt.hash(password_usuario, 10); 

        // Preparar orden para insertar usuario
        //? Los '?' son placeholders que protegen contra inyecciones SQL al analizar como texto simple
        //Los placegolders serán sustituidos por valores al ejecutar la consulta 
        const insertar_usuario = 
        //? Los valores serán agregados en el orden de las propiedades
        'INSERT INTO USUARIOS(nombre_usuario, email, password_usuario, rol) VALUES (?,?,?,?)'; //Preparando consulta
        
        //Ejecutar orden e insertar valores en los placeholders
        const [resultado] = await conexion.query(insertar_usuario,
            [
            nombre_usuario, 
            email, 
            password_hasheada,
            //Toda cuenta nueva empieza en usuario sin permisos de administrador 
            false //False será automaticamente agregado como rol al crear un registro
            ]
        ) 

        //Inserción de usuario exitosa 
        return res.status(201).json({ //Solicitud procesada correctamente al crear un recurso 
            mensaje: 'Usuario registrado con éxito',
            id: resultado.insertId
        });
    }catch(error){

        //Error al registrar un correo existente en la base de datos
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ //Error al crear un recurso por ser un duplicado 
                error: 'El correo ya está registrado' 
            });
        }

        //Error al registrar usuario 
        console.error(error);
        return res.status(500).json({ //Error por parte del servidor
            error: 'Error al registrar usuario'
        });
    }
};

//? Exportamos el objeto con la función adentro
module.exports = { registrarUsuario }; //Exportación del modulo para usarlo en usuario.rutas.js