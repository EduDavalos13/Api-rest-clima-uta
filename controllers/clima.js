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