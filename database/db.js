const mysql = require('mysql2');

const conexion = mysql.createConnection({
    
    //Trabajo local
    /*host: "localhost",
    user: "root",
    password: "",
    database: "clima_utaa"*/
    
    //Trabajo remoto
    host: "******",
    user: "*******",
    password: "*******",
    database: "*******",
    port: 3306,
    dateStrings: true
});

conexion.connect((error) => {
    if(error){
        console.log("El error de conexion es: "+error);
        throw error;
    }
    console.log("Conectado a la BD MySQL");
});


module.exports = conexion;