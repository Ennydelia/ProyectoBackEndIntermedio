const mysql = require('mysql');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    database: 'libreria'
});

connection.connect((err) => {
    if(err){
        console.log("Error de conexión !!!", err);
        return;
    }

    console.log("Conectado");

    //Crea el código que te permita obtener todos los registros de la base de datos
    // let query = "SELECT * FROM libros";
    // let query = "SELECT * FROM autores";

    // Crea el código que te permita obtener un registro en específico
    let query = "SELECT * FROM libros WHERE  id_libro = 35"
    
    connection.query(query, (err, rows) => {
        if(err) throw err;

        console.log(rows);
    });
});