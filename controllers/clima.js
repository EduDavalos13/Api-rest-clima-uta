const conexion = require('../database/db');

exports.obtener_clima = (req, res) =>{
    conexion.query('SELECT * FROM weather ORDER BY ID DESC LIMIT 1', (error,result) =>{
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    });
}

exports.obtener_climas = (req, res) => {
    conexion.query('SELECT * FROM weather', (error,result) => {
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
}

exports.obtener_hoy = (req, res) => {
    conexion.query('SELECT * FROM weather WHERE CREATED >= now() - INTERVAL 24 HOUR', (error,result) => {
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    });
}

exports.obtener_comparacion = (req,res) => {
    conexion.query('Select subdate(current_date, 1) as fecha', (error, result) => {
        if(error){
            throw error;
        }else {
            
            var fecha = result[0].fecha  + ' 21:00:00';
            conexion.query('select * from weather where CREATED between "'+ fecha +'" and now() order by ID asc;', (error,result) => {
                if(error){
                    throw error;
                }else {
                    res.send(result);
                }
            });
        }
    });
}