const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

//const timer = require('./timers/clima');
//const correo = require('./timers/correo');

const app = express();

//Motor de plantillas
app.set('view engine','ejs');

//Captar variables desde el body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Rutas
app.use('/api', require('./routes/router'));

app.listen(5000, () => {
    console.log('SERVER corriendo en http://localhost:5000');
});
