const conexion = require('../database/db');

exports.prediccion = (req, res) =>{
    let modelo = req.params.modelo;
    if(modelo == undefined){
        modelo = "predictions";
    }
    conexion.query('SELECT * FROM '+ modelo +' ORDER BY id DESC LIMIT 72;', (error, result) => {
        if(error){
            throw error;
        }else {
            res.send(result);
        }
    });
}

exports.prediccion_total = (req, res) =>{
    let modelo = req.params.modelo;
    if(modelo == undefined){
        modelo = "predictions";
    }
    conexion.query('SELECT * FROM '+ modelo, (error, result) => {
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