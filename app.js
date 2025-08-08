let numeroSecreto = 0; //las inicializo en 0 porque en mis siguientes funciones se actualizaran con los valores que quiero
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMaximos = Math.ceil(Math.log2(numeroMaximo));

console.log('Max intentos', intentosMaximos);

function asignarTextoElemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento); 
    elementoHTML.innerHTML = texto;
    return; 
}

function verificarIntento () {
    //let numeroDeUsuario = document.querySelector('input');   
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);  //Hay otra forma de obtener el input, cuando queremos obtener del id especifico. Como no queremos el elemento, sino el valor, busacmos el atributo value
    console.log('intento', intentos);
    
    if (numeroDeUsuario == numeroSecreto) {
        asignarTextoElemento('p',`¡Acertaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!\n El numero secreto es ${numeroSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // me va a remover el disabled del boton de nuevo juego desde el html. pnemos reiniciar porque ese es el ID de ese boton en el html.
    } else {
        // el usuario no acerto
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p',`Intento No.${intentos}. El numero secreto es menor al ingresado.`);
        } else {
            asignarTextoElemento('p',`Intento No.${intentos}. El numero secreto es mayor al ingresado.`);
        } 

        intentos++
        if (intentos > intentosMaximos+1){
            asignarTextoElemento('p', `Lo siento, has superado el numero maximo de intentos.`)
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
        limpiarCaja(); //para que se limpie la caja cada que se equivoca el participante
    }
 // triple= nos evalua que todo sea igual, tanto el valor como el tipo de valor
    return;
}  

function limpiarCaja(){
    //let valorCaja = document.querySelector('#valorUsuario'); // poner # es para indicar que quiero Id, y en este caso de nuestro input (valorUsuario)
    //valorCaja.value = '';
    // Una forma mas reducida de hacerlooo:
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    
    console.log('numeroGenerado', numeroGenerado);
    console.log('listaNumerosSorteados', listaNumerosSorteados);

    //Si ya sorteamos todos los numeros (ya entraron todos en la lista de numeros generados).
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Lo siento, ya se sortearon todos los numeros posibles.');
    } else {
        // Si el numero generado esta en la lista de numeros que ya se generaro, vamos a buscar otro 
    if (listaNumerosSorteados.includes(numeroGenerado)){ //Busca si un elemento esta dentro de una lista 
        return generarNumeroSecreto(); // la funcion se llama a si misma, para que vuelva a generar un valor y a verificarlo
    } else{
        listaNumerosSorteados.push(numeroGenerado); // lo a;adimos en la lita
        return numeroGenerado; // lo guardamos como nuevo numero
    }
    }
    
}

function condicionesIniciales(){
    //Indicar mensaje de inicio (intervalo de numeros)
    asignarTextoElemento ('h1', 'Juego del número secreto');
    asignarTextoElemento ('p', `Indica un número del 1 al ${numeroMaximo} para intentar adivinar el número secreto.\n\nTienes ${intentosMaximos} intentos para lograrlo.\n\n¡Mucha suerte!`);
    //generar el numero aleatorio
    numeroSecreto =  generarNumeroSecreto();  // actualizo la variable que ya fue declarada al inicio
    console.log ('Numero secreto', numeroSecreto);
    //Inicializar el numero de intentos
    intentos = 1;
}
function reiniciarJuego(){
    // Necesitamos limpiar la caja
    limpiarCaja();
    //actulizar las condiciones iniciales
    condicionesIniciales();
    //desabilitar de nuevo el boton de Nuevo Juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // setatributte, a diferenci del remove, te pide 2 parametros, que quieres cambiar y que nuevo valor quieres ponerle
}

condicionesIniciales();  // la llamo fuera de tdo para que se actualicen los valores y se inicie el juego
