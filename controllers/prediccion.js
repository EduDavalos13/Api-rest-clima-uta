const conexion = require('../database/db');

exports.prediccion = (req, res) =>{
    var modelo = req.params.modelo;
    conexion.query('SELECT * FROM '+ modelo +'Predictions WHERE utc >= now() - INTERVAL 24 HOUR;', (error, result) => {
        if(error){
            throw error;
        }else {
            res.send(result);
        }
    });
}
