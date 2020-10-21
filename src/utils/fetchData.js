/**
 * Implementación de una API con XMLHttpRequest - Se a añadido como modulo nuevo
 * Utilidad que permite realizar recuperarcion desde una API cualquiera
 */
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


// Instanciando el request
/**
 * Permite hacer peteciones a algun servidor en la nube
 * @param {*} url_api URL API escogida
 */
const fecthData = (url_api) => {
    return new Promise((resolve, reject) =>{
        const xhttp = new XMLHttpRequest();
        //referencia al objeto XMLHttpRequest
        /**
         * A nuestra referencia xhttp le pasamos un LLAMADO 'open'
         * donde: parametro1 = el metodo, 
         * parametro2 = la url, 
         * parametro3 = verificación si es asincrono o no, valor por defecto true
         */
        xhttp.open('GET', url_api, true) ;
        //Cuando el estado del objeto cambia, ejecutar la funcion asincronamente
        xhttp.onreadystatechange = (() => {
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
                (xhttp.status === 200)
                   ? resolve(JSON.parse(xhttp.responseText))
                   : reject(new Error('Error '+ url_api));
            }

        }) 
        xhttp.send()
    })
};

module.exports = fecthData;