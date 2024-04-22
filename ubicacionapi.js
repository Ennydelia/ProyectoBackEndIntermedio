// const API_ENDPOINT = "https://freegeoip.app/json/";
// fetch(API_ENDPOINT)
// .then(response => response.json())
// .then(datosUbicacion => {
//     console.log(datosUbicacion);
//     const latitud = datosUbicacion.latitude,
//     longitud = datosUbicacion.longitude;

//     console.log(`Tus coordenadas son ${latitud}, ${longitud}`);
// });


function obtenerUbicacion() {
    const API_ENDPOINT = "https://freegeoip.app/json/";
    fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(datosUbicacion => {
        console.log(datosUbicacion);
        const latitud = datosUbicacion.latitude,
        longitud = datosUbicacion.longitude;

        console.log(`Tus coordenadas son ${latitud}, ${longitud}`);
        obtenerHoraPorUbicacion(latitud, longitud);
    });
}
  
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    database: 'Registro'
});

function insertInfo(latitud, longitud, fechaHora) {
    let query = `INSERT INTO Horas (latitud, longitud, fechayhora) VALUES (${latitud}, ${longitud}, '${fechaHora}')`;

    // Ejecutar la consulta
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la tabla Horas:', err);
            return;
        }
        console.log('Datos insertados correctamente.');
    });
}

  // Función para obtener la hora 
  function obtenerHoraPorUbicacion(latitud, longitud) {
    const API_ENDPOINT = `https://api.timezonedb.com/v2.1/get-time-zone?key=T17YKDCVAI38&format=json&by=position&lat=${latitud}&lng=${longitud}`;
    
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const hora = new Date(data.formatted);
        console.log('La hora en tu ubicación es:', hora.toLocaleString());
        const fechaHora = data.formatted;

        console.log(fechaHora);
        // SE HACE EL REGISTRO EN MY SQL DE LA INFORMACION 
        insertInfo(latitud, longitud, fechaHora);
      })
      .catch(error => {
        console.error('Error al obtener la hora:', error);
      });
  }

  connection.connect((err) => {
    if(err){
        console.log("Error de conexión !!!", err);
        return;
    }

    console.log("Conectado a la base de datos MySQL");

    // Llama a la función para obtener la ubicación del usuario
    obtenerUbicacion();
});