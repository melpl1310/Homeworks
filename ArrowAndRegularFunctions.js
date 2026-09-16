//Diferencias entre Arrow Functions y Regular Functions:

/* 1. Sintaxis:
Sintaxis: Las Regular Functions utilizan obligatoriamente la palabra clave function y un formato más 
largo. Las Arrow Functions eliminan esta palabra clave y utilizan el operador flecha =>, lo que permite 
escribir código mucho más compacto.
*/

/* 2. Contexto de this:
Las Regular Functions crean su propio contexto de this, lo que significa que el valor de this dentro de 
la función dependerá de cómo se llame a la función. Por otro lado, las Arrow Functions no crean su 
propio contexto de this; en su lugar, heredan el valor de this del contexto en el que fueron definidas. 
*/

/* 3. Uso de objeto arguments:
Las Regular Functions tienen acceso al objeto arguments, que contiene todos los argumentos pasados a la 
función. Las Arrow Functions no tienen su propio objeto arguments; si se necesita acceder a los 
argumentos, se debe utilizar el operador rest (...) para lograr el mismo resultado.
*/

/* 4. Uso como constructores:
Las Regular Functions pueden ser utilizadas como constructores para crear instancias de objetos mediante 
el uso de la palabra clave new. Las Arrow Functions no pueden ser utilizadas como constructores y 
lanzarán un error si se intenta hacerlo.
*/

//Ejemplo de Regular Function:

function verificarNumero(numero) {
    if (numero % 2 === 0) {
        console.log("El número es par");
    } else {
        console.log("El número es impar");
    }
}

verificarNumero(8);
verificarNumero(5);

/*Resultado:
El número es par
El número es impar
*/

//Ejemplo de Arrow Function:

const verificarNumeroArrow = (numero) => {
    if (numero % 2 === 0) {
        console.log("El número es par");
    } else {
        console.log("El número es impar");
    }
};

verificarNumeroArrow(8);
verificarNumeroArrow(5);

/*Resultado:
El número es par
El número es impar
*/