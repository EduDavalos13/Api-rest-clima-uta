const conexion = require('../database/db');

function getPromClima(){
    
    conexion.query('SELECT AVG(AMBIENT_TEMPERATURE) as Temperatura, AVG(AIR_PRESSURE) as Presion, AVG(HUMIDITY) as Humedad FROM  WEATHER_MEASUREMENT WHERE serverDate > now() - interval 1 hour ORDER BY ID;', (error, result) => {
        if(error){
            throw error;
        }else{
            Temperatura = Math.round(result[0].Temperatura);
            Presion = Math.round(result[0].Presion);
            Humedad = Math.round(result[0].Humedad);
            console.log(Temperatura, Presion, Humedad);

            conexion.query('INSERT INTO weather (AMBIENT_TEMPERATURE, AIR_PRESSURE, HUMIDITY) VALUES ('+ Temperatura +', '+ Presion +', '+ Humedad +');');

        }
    });
}

getPromClima();

setInterval(getPromClima,1000*60*60);