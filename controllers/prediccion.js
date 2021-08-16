const conexion = require('../database/db');

exports.prediccion = (req, res) =>{
    var modelo = req.params.modelo;
    conexion.query('SELECT * FROM '+ modelo +'Predictions ORDER BY id DESC LIMIT 72;', (error, result) => {
        if(error){
            throw error;
        }else {
            res.send(result);
        }
    });
}

//En caso de que ernie no arregle lo de las predicciones
// que no inserta sino que crea las tablas desde cero ¯\_(ツ)_/¯
exports.prueba = (req,res) => {
    conexion.query('Select subdate(current_date, 1) as fecha', (error, result) => {
        if(error){
            throw error;
        }else {
            var fecha = result[0].fecha  + ' 21:00:00';
            console.log(fecha);
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