var nodemailer = require('nodemailer');
const conexion = require('../database/db');

var disponible = [];

/**
 * Configuracion del correo el cual envia las notificaciones.
 */
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'clima.uta.iqq@gmail.com',
      pass: ''
    }
});

/**
 * Configuracion por defecto del contenido y emisor del mensaje.
 */
var mailOptions = {
    from: 'clima.uta.iqq@gmail.com',
    to: 'clima.uta.iqq@gmail.com',
    subject: 'Mensaje de prueba',
    text: 'Este mensaje fue enviado automaticamente, usando NodeJS'
};


/**
 * Establece como disponible todos los correos para asi poder enviar su notificacion.
 * A lo largo del codigo estos se colocan en false para si no notificar dos veces seguidas de
 * la caida de algun sensor.
 */
function enable(){
    for(let i = 11; i <= 14; i++){
        disponible[i] = true;
    }
}

/**
 * Cada una hora consulta por el ultimo regstro de cada sensor, si este da una respuesta vacia,
 * procee a enviar la notificacion al respectivo supervisor del supervisor.
 * La funcion no funciona en el intervalo de las 00:00 - 07:00 hrs, para evitar molestias a altas 
 * horas de la noche.
 */
function correos(){
    var hora = new Date().getHours();
    var tiempo_caida;
    //var tiempo_caida;
    for(let i = 11; i < 15; i++){
        conexion.query('SELECT * FROM  WEATHER_MEASUREMENT WHERE REMOTE_ID ='+ i +' AND serverDate > now() - interval 1 hour ORDER BY ID DESC LIMIT 1;', (error, result) => {
            if(error){
                throw error;
            }else{
                if(disponible[i] == false && result.length != 0){
                    disponible[i] = true;
                    console.log("El sennsor "+ i + " se encuentra activo");
                }
                
                if(result.length == 0 && hora >= 7 && disponible[i] == true){
                    conexion.query('SELECT serverDate FROM  WEATHER_MEASUREMENT WHERE REMOTE_ID ='+ i +' ORDER BY ID DESC LIMIT 1;',(error, result) => {
                        if(error){
                            throw error;
                        }else{
                            //console.log(Object.values(result));
                            tiempo_caida = result[0].serverDate;
                            mailOptions.text = "El ultimo registro del sensor " + i + " fue el " + tiempo_caida;
                            //console.log(mailOptions.text);
                            mailOptions.subject = "Sensor " + i + " apagado";
                    switch(i){
                        /**
                         * En caso de querer cambiar los correos donde llegan las notificacions
                         * se deberan cambiar cada uno de los listados aqui abajo, dependiendo del encargado
                         * de cada sensor.
                         */
                        case 11:
                            mailOptions.to = "clima.uta.iqq@gmail.com";
                            disponible[i] = false;
                            break;
                        case 12:
                            mailOptions.to = "clima.uta.iqq@gmail.com";
                            disponible[i] = false;
                            break;
                        case 13:
                            mailOptions.to = "clima.uta.iqq@gmail.com";
                            disponible[i] = false;
                            break;
                        case 14:
                            mailOptions.to = "clima.uta.iqq@gmail.com";
                            disponible[i] = false;
                            break;
                    }

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                    });
                        }
                    });
                    mailOptions.text = "El ultimo registro del sensor " + i + " fue el " + tiempo_caida;
                    //console.log(mailOptions.text);
                    
                }
            }
        });
    }
}

correos();
enable();
/**
 * En caso de querer cambiar el intervalo de notificacion, se debera cambiar el valor aqui abajo.
 * Recordar que se mide en "ms", por lo cual un segundo equivale a 1000ms
 * Establecido por defecto cada una hora.
 */
setInterval(correos,1000*60*60);

