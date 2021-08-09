const express = require('express');
const router = express.Router();

const conexion = require('../database/db');

//Rutas registro
const registro = require('../controllers/registro');
router.get('/get-records', registro.mostrar_todos);
router.get('/get-record/:idRaspi?', registro.mostrar_actual);
//router.get('/obtener-clima/:idRaspi?', registro.obtener_registros);

//Rutas prediccion
const prediccion = require('../controllers/prediccion');
router.get('/prediccion/:modelo?',prediccion.prediccion);

//Rutas clima
const clima = require('../controllers/clima');
router.get('/clima', clima.obtener_clima);
router.get('/climas-total', clima.obtener_climas);
router.get('/clima-hoy/:tiempo?', clima.obtener_hoy);


module.exports = router;