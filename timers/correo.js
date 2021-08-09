var nodemailer = require('nodemailer');
const conexion = require('../database/db');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'negaxis321@gmail.com',
      pass: 'Kzhp5frp@3922598'
    }
  });

var mailOptions = {
    from: 'negaxis321@gmail.com',
    to: 'negaxis321@gmail.com',
    subject: 'Mensaje de prueba',
    text: 'Este mensaje fue enviado automaticamente, usando NodeJS'
};

function correos(){
    for(let i = 11; i < 15; i++){
        conexion.query('SELECT * FROM  WEATHER_MEASUREMENT WHERE REMOTE_ID ='+ i +' AND serverDate > now() - interval 1 hour ORDER BY ID DESC LIMIT 1;', (error, result) => {
            if(error){
                throw error;
            }else{
                if(result.length == 0){
                    mailOptions.text = "El sensor " + i + " se encuentra apagado";
                    switch(i){
                        case 11:
                            mailOptions.subject = "Falla sensor " + i;
                            break;
                        case 12:
                            mailOptions.subject = "Falla sensor " + i;
                            break;
                        case 13:
                            mailOptions.subject = "Falla sensor " + i;
                            break;
                        case 14:
                            mailOptions.subject = "Falla sensor " + i;
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
setInterval(correos,1000*60*60);

