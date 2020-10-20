/**
 * Implementación de una API con XMLHttpRequest
 */
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/**
 * URL de API del desafio ~ Info personaje
 */
let api = 'https://rickandmortyapi.com/api/character/';

// Instanciando el request
/**
 * Permite hacer peteciones a algun servidor en la nube
 * @param {*} url_api URL API escogida
 * @param {*} callback funcion que se desea procesar
 */
function fecthData(url_api, callback) {
    let xhttp = new XMLHttpRequest();
    //referencia al objeto XMLHttpRequest
    /**
     * A nuestra referencia xhttp le pasamos un LLAMADO 'open'
     * donde: parametro1 = el metodo, 
     * parametro2 = la url, 
     * parametro3 = verificación si es asincrono o no, valor por defecto true
     */
    xhttp.open('GET', url_api, true) ;
    //Cuando el estado del objeto cambia, ejecutar la funcion asincronamente
    xhttp.onreadystatechange = function (event) {
        /**
         * Los estados que puede tener son:
         * 0: inicializado
         * 1: cargando
         * 2: ya se cargo
         * 3: ya hay info
         * 4: solicitud completa
         * 
         * PD: recuerda, estas trabajando con una API externa osea un servidor 
         * por lo que dependedel servidor caunto demore, en cada estado se realiza una solictud
         * de datos (request)
         */
        if(xhttp.readyState === 4){ // Verefica que estado sea 4 : listo
            
            /**
             * ESTADO 1xx (100 - 199): Indica que la petición esta siendo procesada.
             * ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente.
             * ESTADO 3xx (300 - 399): Indica que hay que tomar acciones adicionales para completar la solicitud. Por lo general indican redireccionamiento.
             * ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
             * ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
             */
            if(xhttp.status === 200){
                /**
                 * Estandar de node con callbacks, primer parametro error, segundi el resultado
                 */
                callback(null, JSON.parse(xhttp.responseText));
            }
        }else{
            const error = new Error('Error '+ url_api)
            return callback(error, null)
        }
    }
    xhttp.send()
}


fecthData(api, function(error1, data1){
    if(error1) return console.error(error1);

    fecthData(api + data1.results[0].id, function (error2, data2){
        if(error2) return console.error(error2);
        fecthData(data2.origin.url, function(error3, data3){
            if(error3) return console.error(error3);

            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);

               // rutas de las peticiones en orden
            console.log(api);
            console.log(api + data1.results[0].id); 
            console.log(data2.origin.url); 
        })
    })
});


// primero buscamos la lista de personajes
/* fetchData(api, (error1, data1) => {
    // si error, matamos retornando un error
    if(error1) return console.error(error1);
    // luego buscamos en la api el id de Rick
    fetchData(api + data1.results[0].id, (error2, data2) => {
      // si error, matamos retornando un error
      if(error2) return console.error(error2);
      // por ultimo la consulta a la api que contiene su dimension
      fetchData(data2.origin.url, (error3, data3) => {
        // si error, matamos retornando un error
        if(error3) return console.error(error3);
        
        // mostramos los resultados :) 
        console.log(data1.info.count);
        console.log(data2.name);
        console.log(data3.dimension);
        
        // rutas de las peticiones en orden
        console.log(api);
        console.log(api + data1.results[0].id); 
        console.log(data2.origin.url); 
      
      });
    });
  });
 */