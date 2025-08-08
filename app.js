
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
        asignarTextoElemento('p',`Acertaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.\n El numero secreto es ${numeroSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // me va a remover el disabled del boton de nuevo juego desde el html. pnemos reiniciar porque ese es el ID de ese boton en el html.
    } else {
        // el usuario no acerto
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El numero secreto es menor al ingresado.');
        } else {
            asignarTextoElemento('p','El numero secreto es mayor al ingresado.');
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
    asignarTextoElemento ('p', `Indica un número del 1 al ${numeroMaximo}. Tienes`);
    //generar el numero aleatorio
    numeroSecreto =  generarNumeroSecreto();  // actualizo la variable que ya fue declarada al inicio
    console.log ('Numero secreto', numeroSecreto);
    //Inicializar el numero de intentos
    intentos = 1;
}
function reiniciarJuego(){
    // Necesitamos limpiar la caja
    limpiarCaja();

    //Indicar mensaje de inicio (intervalo de numeros)
    //mensajesIniciales();
    //generar el numero aleatorio
    //numeroSecreto =  generarNumeroSecreto(); // actualizo la variable que ya fue declarada al inicio
    //Inicializar el numero de intentos
    //intentos = 1;
    //puedo poner todo en la misma funcion como condiciones Iniciales
    
    //actulizar las condicioes iniciales
    condicionesIniciales();
    //desabilitar de nuevo el boton de Nuevo Juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // setatributte, a diferenci del remove, te pide 2 parametros, que quieres cambiar y que nuevo valor quieres ponerle
}

condicionesIniciales();  // la llamo fuera de tdo para que se actualicen los valores y se inicie el juego



//ESTE ES EL EJEMPLO DE CLASE INICIAL 
//Antes de haber generado las funciones que resumen esto, asi no se tiene que dar la repeticion de las selecciones individuales de elementos 

// let titulo = document.querySelector('h1'); //document es un puente entre html y javascript, por ello pongo h1, que no es un texto, sino un objeto
// titulo.innerHTML = 'Juego del número secreto';

// let parrafo = document.querySelector('p'); //querySelector es un metodo selector, seleccionamos objetos o elementos
// parrafo.innerHTML = 'Indica un número del 1 al 10';

// function intentoUsuario () {
//     alert('click desde el boton');
// }   


//EJERCICIOS DE PRACTICA

/*

//EJERCICIO 1 DE PRACTICA
//Crea una función que calcule el índice de masa corporal (IMC) de una persona a partir de su altura en metros y peso en kilogramos, que se recibirán como parámetros.
alert('Vamos a calcular tu IMC');
let altura = parseFloat(prompt('Por favor, indica tu altura en metros(m).'));
let peso = parseFloat(prompt('Ahora indica tu peso en kilogramos(kg).'));


function calculoImc(altura, peso){
    let imc=peso/(altura*altura).toFixed(2);
    imc = parseFloat(imc.toFixed(2));
    alert(`Tu IMC actual es de ${imc}.${(imc>=18.5 && imc<=24.9) ? ' Esta dentro del rango de normal' : rangosImc(imc)}`);
}

function rangosImc(imc) {
    if (imc >= 30) {
        return('Está dentro del rango de obesidad.');
    } else if (imc >= 25 && imc <= 29.9) {
        return('Está dentro del rango de sobrepeso.');
    } else {
        return('Está dentro del rango de bajo peso.');
    }
}

calculoImc(altura, peso);
*/

/*
//EJERCICIO 2 DE PRACTICA
//Crea una función que calcule el valor del factorial de un número pasado como parámetro.

let numero = prompt('Introduce el numero entero al que le quieres calcular el factorial ');

function calcularFactorial(numero){
    if (numero === 0 || numero === 1){
        return 1; // por definicion de los factoriales
    } else {
        return numero * calcularFactorial(numero - 1);
    }
}

let resultado = calcularFactorial(numero);
 alert(`El factorial de ${numero} es ${resultado}`);
*/

/*

//EJERCICIO 3 DE PRACTICA
// Crea una función que convierta un valor en dólares, pasado como parámetro, y devuelva el valor equivalente en PESOS MEXICANOS

let dolares = parseFloat(prompt('Ingrese la cantidad de dolares que quiere convertir a pesos mexicanos.'))
let conversionActual = Math.random() * (21 - 18) + 18;
conversionActual = parseFloat(conversionActual.toFixed(2));

function dolaresApesos(dolares, conversionActual){
    let pesos = (dolares * conversionActual);
    alert(`${dolares} dolares son igual a ${pesos} pesos, con la tasa de conversion actual de ${conversionActual} pesos por dolar.`);
}

dolaresApesos(dolares, conversionActual);
*/

/*
//EJERCICIO 4 DE PRACTICA
// Crea una función que muestre en pantalla la tabla de multiplicar de un número dado como parámetro.

let numero = parseInt(prompt('De que numero quieres repasar la tabla de multiplicar?'));

function mostrarTablaDeMultiplicar(numero) {
  for (var i = 1; i <= 10; i++) {
    var resultado = numero * i;
    console.log(numero + " x " + i + " = " + resultado);
  }
}

mostrarTablaDeMultiplicar(numero);
*/

/*
//EJERCICIO 5 DE PRACTICA
//Crea una lista vacía con el nombre listaGenerica. 
listaGenerica = [];

//Crea una lista de lenguajes de programación llamada lenguagesDeProgramacion. Agrega a la lista lenguagesDeProgramacion los siguientes elementos.
lenguajesDeProgramacion = ['JavaScript', 'C', 'C++', 'Kotlin', 'Python'];
console.log(lenguajesDeProgramacion);
lenguajesDeProgramacion.push('Java','Ruby', 'GoLang');
console.log(lenguajesDeProgramacion);

//Crea una función que muestre en la consola todos los elementos de la lista "lenguagesDeProgramacion.
function mostrarEnConsola(){
    for (let i = 0; i < lenguajesDeProgramacion.length; i++){
        console.log(lenguajesDeProgramacion[i]);
    }
}

//Crea una función que muestre en la consola todos los elementos de la lista "lenguagesDeProgramacion en orden inverso.
function mostrarOrdenInverso(){
    for (let i = lenguajesDeProgramacion.length; i >= 0; i--){
        console.log(lenguajesDeProgramacion[i]);
    }
}

mostrarOrdenInverso();

//Crea una función que calcule el promedio de los elementos en una lista de números

numeros = [10, 8, 9, 6.5, 7, 8, 10, 8, 10];
let suma = 0;

function promedio(numeros){
    numerosTotales=numeros.length;
    for (let i = 0; i < numerosTotales; i++){
        suma += numeros[i];
    }
    return suma /numerosTotales;
}

let media = promedio(numeros);
console.log('Media', media);
*/

