const conexion = require('../database/db');

exports.obtener_pesos = (req, res) =>{
    conexion.query('SELECT ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Tamaño (MB)" FROM information_schema.TABLES WHERE table_schema = "weather" ORDER BY (table_name);', (error,result) =>{
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    });
}