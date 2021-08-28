var nodemailer = require('nodemailer');
const conexion = require('../database/db');

var disponible = [];

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '*********',
      pass: '********'
    }
});

var mailOptions = {
    from: '********',
    to: '*********',
    subject: 'Mensaje de prueba',
    text: 'Este mensaje fue enviado automaticamente, usando NodeJS'
};

function enable(){
    for(let i = 11; i <= 14; i++){
        disponible[i] = true;
    }
}

function correos(){
    var hora = new Date().getHours();
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
                    mailOptions.text = "El sensor " + i + " se encuentra apagado";
                    mailOptions.subject = "Falla sensor " + i;
                    switch(i){
                        case 11:
                            mailOptions.to = "jdiazr@academicos.uta.cl"
                            disponible[i] = false;
                            break;
                        case 12:
                            mailOptions.to = "jdiazr@academicos.uta.cl"
                            disponible[i] = false;
                            break;
                        case 13:
                            mailOptions.to = "fsantiago@academicos.uta.cl"
                            disponible[i] = false;
                            break;
                        case 14:
                            mailOptions.to = "mpinto@academicos.uta.cl"
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
            }
        });
    }
}

correos();
enable();
setInterval(correos,1000*60*60);

