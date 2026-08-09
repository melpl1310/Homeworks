/*
1. length: Esta función sirve para saber cuántos elementos tiene un arreglo. 
Ejemplo:
*/
let estudiantes = ["Ana", "Carlos", "Laura", "Pedro"];
console.log(estudiantes.length);

Resultado: 4

/*
2. at(): Esta función sirve para acceder a un elemento específico de un arreglo utilizando su posición. 
Ejemplo:
*/
let frutas = ["manzana", "pera", "uva"];
console.log(frutas.at(0));

Resultado: "manzana"

/*
3. concat(): Esta función sirve para unir dos o más arreglos sin modificar los originales. 
Ejemplo:
*/
let grupoA = ["Ana", "Luis"];
let grupoB = ["Sofia", "Carlos"];
let estudiantes = grupoA.concat(grupoB);
console.log(estudiantes);

Resultado: ["Ana", "Luis", "Sofia", "Carlos"]

/*
4. constructor: Indica qué tipo de objeto es el arreglo.
Ejemplo 1:
*/
let edades = [18, 20, 22];
console.log(edades.constructor);

Resultado: Array() { [native code] }

//Ejemplo 2:

[].constructor === Array; 

Resultado:true

/*
5. copyWithin(): Esta función copia elementos dentro del mismo arreglo y los coloca en otra posición.
Ejemplo:
*/
let numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
numeros.copyWithin(0, 2);
console.log(numeros);

Resultado: [30, 40, 50, 60, 40, 50, 60, 70, 80, 90, 100]

/*
6. entries(): Esta función devuelve la posición y el valor de cada elemento.
*/
let ciudades = ["Cartagena", "Bogotá", "Medellín"];
console.log([...ciudades.entries()]);

Resultado: [[0, "Cartagena"], [1, "Bogotá"], [2, "Medellín"]]

/*
7. every(): Esta función verifica si todos los elementos cumplen con una condición.
Ejemplo:
*/
let edades = [20, 25, 30, 22];
let mayores = edades.every(edad => edad >= 18);
console.log(mayores);

Resultado: true

/*
8. fill(): Esta función llena todo el arreglo con un valor específico.
Ejemplo:
*/
let numeros = [1, 2, 3, 4, 5];
numeros.fill(0);
console.log(numeros);

Resultado: [0, 0, 0, 0, 0]

/*
9. filter(): Esta función crea un nuevo arreglo con todos los elementos que cumplan con una condición.
Ejemplo:
*/
let edades = [12, 17, 20, 25, 15];
let mayores = edades.filter(edad => edad >= 18);
console.log(mayores);

Resultado: [20, 25, 30, 22]

/*
10. find(): Esta función devuelve el primer elemento que cumpla con una condición.
Ejemplo:
*/
let precios = [5000, 12000, 8000, 20000];
let resultado = precios.find(precio => precio > 10000);
console.log(resultado);

Resultado: 12000

/*
11. findIndex(): Esta función busca en qué posición está el primer elemento que cumple la condición.
Ejemplo:    
*/
let notas = [2.5, 3.0, 4.5, 4.0];
let posicion = notas.findIndex(nota => nota >= 4);
console.log(posicion);

Resultado: 2

/*
12. findLast(): Esta función busca desde el final el último elemento que cumple la condición.
Ejemplo:    
*/
let edades = [15, 22, 17, 30, 19];
let resultado = edades.findLast(edad => edad >= 18);
console.log(resultado);

Resultado: 19

/*
13. findLastIndex(): Esta función busca desde el final la posición del último elemento que cumple la condición.
Ejemplo:
*/
let notas = [5, 3, 4, 2, 4];
let posicion = notas.findLastIndex(nota => nota >= 4);
console.log(posicion);

Resultado: 4

/*
14. flat(): Esta función aplana un arreglo de varios niveles a un solo nivel.
Ejemplo:
*/
let grupos = [["Ana", "Luis"], ["Carlos", "Sofia"]];
console.log(grupos.flat());

Resultado: ["Ana", "Luis", "Carlos", "Sofia"]

/*
15. flatMap(): Esta función primero aplica una función a cada elemento y luego junta los resultados.
Ejemplo:
*/
let numeros = [1, 2, 3];
let resultado = numeros.flatMap(num => [num, num * 2]);
console.log(resultado);

Resultado: [1, 2, 2, 4, 3, 6]

/*
16. forEach(): Esta función ejecuta una función para cada elemento del arreglo.
Ejemplo:
*/
let ciudades = ["Cartagena", "Cali", "Bogotá"];
ciudades.forEach(ciudad => {
    console.log("Estoy en " + ciudad);
});

Resultado:
Estoy en Cartagena
Estoy en Cali
Estoy en Bogotá

/*
17. includes(): Esta función verifica si un elemento específico está presente en el arreglo.
Ejemplo:
*/
let materias = ["Matemáticas", "Programación", "Física"];
console.log(materias.includes("Programación"));

Resultado: true

/*
18. indexOf(): Esta función devuelve la posición de un elemento específico en el arreglo.
Ejemplo:
*/
let frutas = ["manzana", "pera", "uva"];
console.log(frutas.indexOf("pera"));

Resultado: 1

/*
19. join(): Esta función une todos los elementos de un arreglo en una cadena y permite elegir cómo separarlos.
Ejemplo:
*/
let nombres = ["Ana", "Luis", "Carlos"];
console.log(nombres.join(" - "));

Resultado: "Ana - Luis - Carlos"

/*
20. keys(): Esta función muestra las posiciones que existen dentro del arreglo.
Ejemplo:    
*/
let videojuegos = ["Minecraft", "FIFA", "Mario"];
console.log([...videojuegos.keys()]);

Resultado: [0, 1, 2]

/*
21. lastIndexOf(): Esta función devuelve la última posición de un elemento específico en el arreglo.
Ejemplo:
*/
let frutas = ["manzana", "pera", "uva", "pera"];
console.log(frutas.lastIndexOf("pera"));

Resultado: 3

/*
22. map(): Esta función recorre los elementos y crea otro arreglo con los valores modificados.
Ejemplo:    
*/
let precios = [10000, 20000, 30000];
let nuevosPrecios = precios.map(precio => precio * 2);
console.log(nuevosPrecios);

Resultado: [20000, 40000, 60000]

/*
23. pop(): Esta función elimina el último elemento del arreglo.
Ejemplo:
*/
let tareas = ["Estudiar", "Programar", "Leer"];
tareas.pop();
console.log(tareas);

Resultado: ["Estudiar", "Programar"]

/*
24. push(): Esta función agrega un elemento al final del arreglo.
Ejemplo:
*/
let frutas = ["manzana", "pera"];
frutas.push("uva");
console.log(frutas);

Resultado: ["manzana", "pera", "uva"]

/*
25. reduce(): Esta función sirve para juntar todos los valores y obtener un solo resultado.
Ejemplo:
*/
let gastos = [10000, 5000, 15000];
let total = gastos.reduce((suma, gasto) => suma + gasto, 0);
console.log(total);

Resultado: 30000

/*
26. reduceRight(): Esta función es similar a reduce(), pero recorre el arreglo de derecha a izquierda.
Ejemplo:
*/
let palabras = ["uno", "dos", "tres"];
let resultado = palabras.reduceRight(
    (texto, palabra) => texto + " " + palabra,"");
console.log(resultado);

Resultado: " tres dos uno"

/*
27. reverse(): Esta función invierte el orden de los elementos del arreglo.
Ejemplo:
*/
let numeros = [1, 2, 3, 4, 5];
numeros.reverse();
console.log(numeros);

Resultado: [5, 4, 3, 2, 1]

/*
28. shift(): Esta función elimina el primer elemento del arreglo.
Ejemplo:
*/
let frutas = ["manzana", "pera", "uva"];
frutas.shift();
console.log(frutas);

Resultado: ["pera", "uva"]

/*
29. slice(): Esta función devuelve una copia de una parte del arreglo sin modificar el original.
Ejemplo:
*/
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
let trimestre = meses.slice(0, 3);
console.log(trimestre);

Resultado: ["Enero", "Febrero", "Marzo"]

/*
30. some(): Esta función verifica si al menos un elemento cumple con una condición.
Ejemplo:
*/
let notas = [2.5, 3.2, 2.8, 4.5];
let aprobado = notas.some(nota => nota >= 4);
console.log(aprobado);

Resultado: true

/*
31. sort(): Esta función organiza los elementos del arreglo en un determinado orden.
Ejemplo:
*/
let edades = [25, 18, 30, 21];
edades.sort((a, b) => a - b);
console.log(edades);

Resultado: [18, 21, 25, 30]

/*
32. splice(): Esta función permite agregar, eliminar o reemplazar elementos..
Ejemplo:
*/
let frutas = ["manzana", "pera", "uva"];
frutas.splice(1, 1, "naranja");
console.log(frutas);

Resultado: ["manzana", "naranja", "uva"]

/*
33. toLocaleString(): Esta función convierte los valores a texto usando un formato apropiado para un país 
o idioma. Ejemplo:
*/
let precios = [1500, 25000, 100000];
console.log(precios.toLocaleString("es-CO"));

Resultado: "1.500, 25.000, 100.000"

/*
34. toString(): Esta función convierte el contenido del arreglo en una cadena de texto.
Ejemplo:
*/
let numeros = [1, 2, 3, 4, 5];
console.log(numeros.toString());

Resultado: "1,2,3,4,5"

/*
35. unshift(): Esta función agrega uno o más elementos al inicio del arreglo.
Ejemplo:
*/
let tareas = ["Hacer ejercicio", "Estudiar"];
tareas.unshift("Desayunar");
console.log(tareas);

Resultado: ["Desayunar", "Hacer ejercicio", "Estudiar"]

/*
36. values(): Esta función muestra los valores que están guardados dentro del arreglo.
Ejemplo:
*/
let animales = ["perro", "gato", "conejo"];
console.log([...animales.values()]);

Resultado: ["perro", "gato", "conejo"]