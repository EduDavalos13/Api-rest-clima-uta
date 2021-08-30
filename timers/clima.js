const conexion = require('../database/db');

function getPromClima(){
    
    conexion.query('SELECT AVG(AMBIENT_TEMPERATURE) as Temperatura, AVG(AIR_PRESSURE) as Presion, AVG(HUMIDITY) as Humedad FROM  WEATHER_MEASUREMENT WHERE serverDate > now() - interval 1 hour ORDER BY ID;', (error, result) => {
        if(error){
            throw error;
        }else{
            Temperatura = (Math.round(result[0].Temperatura * 100) / 100).toFixed(2);
            Presion = (Math.round(result[0].Presion * 100) / 100).toFixed(2);
            Humedad = (Math.round(result[0].Humedad * 100) / 100).toFixed(2);
            console.log(Temperatura, Presion, Humedad);

            conexion.query('INSERT INTO weather (AMBIENT_TEMPERATURE, AIR_PRESSURE, HUMIDITY) VALUES ('+ Temperatura +', '+ Presion +', '+ Humedad +');');

        }
    });
}

setInterval(getPromClima,1000*60*60);