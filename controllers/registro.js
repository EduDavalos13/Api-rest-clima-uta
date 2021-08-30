const conexion = require('../database/db');
//conexion.getConnection();
exports.mostrar_todos = (req,res) => {
    conexion.query('SELECT * FROM WEATHER_MEASUREMENT WHERE ID != (SELECT MAX(ID) FROM WEATHER_MEASUREMENT);', (error, result) =>{
        if(error){
            throw error;
        }else {
            res.send(result);
        }
    });
}

exports.mostrar_actual = (req, res) =>{
    var idRaspi = req.params.idRaspi;
    conexion.query('SELECT * FROM  WEATHER_MEASUREMENT WHERE REMOTE_ID ='+ idRaspi +' AND serverDate > now() - interval 30 minute ORDER BY ID DESC LIMIT 1;', (error, result) => {
        if(error){
            throw error;
        }else {
            res.send(result);
        }
    });
}

exports.obtener_registros = (req, res) => {
    
    conexion.query('SELECT AVG(AMBIENT_TEMPERATURE) as Temperatura, AVG(AIR_PRESSURE) as Presion, AVG(HUMIDITY) as Humedad FROM  WEATHER_MEASUREMENT WHERE serverDate > now() - interval 1 hour ORDER BY ID DESC LIMIT 360;', (error, result) => {
        if(error){
            throw error;
        }else {
            console.log(result[0].Temperatura);
            res.send(result);
        }
    });
}
