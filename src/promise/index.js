/**
 * Instacimiento de funcion;  con una promesa
 */
const somethingWillHappen = () => {
    return new Promise( (resolve, reject) => {
        if(true){
            resolve('Hey!')
        }else {
            reject('Whooooops!')
        }
    })
};


/**
 * Ejecución~Invocaion de funcion con promesa. 
 * Esta dependiendo del retirna accionara una acción o la otra.
 */
somethingWillHappen()
.then(response => console.log(response))
.catch(err => console.log(err)) ;


const somethingWillHappen2 = () => {
    return new Promise((resolve, reject)=> {
        if(true) {
            setTimeout(()=> {
                resolve('True');
            }, 2000)
        } else{
            const error = new Error('Whoooops!')
        }
    })
};

somethingWillHappen2()
.then(response => console.log(response))
.catch(err => console.log(err)) ;




Promise.all([somethingWillHappen(somethingWillHappen(), somethingWillHappen2())])
.then( response => {
    console.log('Array of results: ', response);
})
.catch(err => {
    console.error(err);
})