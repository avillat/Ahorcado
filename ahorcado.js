var palabra = "Tamarindo";
var hombre;
var l; 
var espacio; 

//Crearemos objetos
//Se creará una Clase llama "Ahorcado". Es una clase en la que yo dibujo el poste, y tendrá una función Trazar
//Declaración de la clase Ahorcado
var Ahorcado = function (con)
{
	//"this" son las variables locales de la Clase, accesibles en toda la clase.
	//"this.contexto" es el context de dibujo del canvas, que llega por parámetro desde la variable "con".
	this.contexto = con;
	this.maximo = 5; // máximo número de intentos posibles
	this.intentos = 0;
	this.vivo = true;

	this.dibujar(); //invocamos la función dibujar, que se define más abajo.
}

Ahorcado.prototype.dibujar = function()
{
	var dibujo = this.contexto;

	//Dibujando el poste
	dibujo.beginPath(); //esto es como mover el lápiz encima del papel para empezar a dibujar.
	dibujo.moveTo(150,100); //lleva el cursor al lugar correcto
	dibujo.lineTo(150,50);
	dibujo.lineTo(400,50);
	dibujo.lineTo(400,350);
	dibujo.lineWidth = 15;
	dibujo.strokeStyle = "#000000"; //doy estilo a la línea
	dibujo.stroke();
	dibujo.closePath(); //cerrar el Path no dibuja la línea, lo que hace es agrupar el dibujo que estoy haciendo.

	//Dibujando a nuestro personaje.
	if(this.intentos > 0)
	{
		//intentos= 1 --> rostro
		dibujo.beginPath();
		dibujo.arc(150, 140, 40, 0, Math.PI *2, false); // Centro es (150,140), radio es 40 pixelex, que arranca de 0 a una vuelta entera (2 veces Pi), y parte en dirección de las manecillas del reloj.
		dibujo.strokeStyle="#F00";
		dibujo.lineWidth = 5;
		dibujo.stroke(); 
		dibujo.closePath();

		
		if(this.intentos > 1)
		{
			//intentos = 2 --> torso
			dibujo.beginPath();
			dibujo.moveTo(150,180);
			dibujo.lineTo(150,250);
			dibujo.strokeStyle="#F00";
			dibujo.lineWidth = 5;
			dibujo.stroke(); 
			dibujo.closePath();	

			if(this.intentos > 2)
			{
				//intentos = 3 --> brazos
				dibujo.beginPath();
				dibujo.moveTo(120,220);
				dibujo.lineTo(150,195);
				dibujo.lineTo(180,220)
				dibujo.strokeStyle="#F00";
				dibujo.lineWidth = 5;
				dibujo.stroke(); 
				dibujo.closePath();	

				if (this.intentos >3) 
				{
					//intentos = 4 --> piernas
					dibujo.beginPath();
					dibujo.moveTo(120,280);
					dibujo.lineTo(150,250);
					dibujo.lineTo(180,280)
					dibujo.strokeStyle="#F00";
					dibujo.lineWidth = 5;
					dibujo.stroke(); 
					dibujo.closePath();	

					if(this.intentos > 4)
					{
						//intentos = 5 --> ojos muertos
						// Ojo izquierdo
						dibujo.beginPath();
						dibujo.moveTo(125,120);
						dibujo.lineTo(145,145);
						dibujo.moveTo(145,120);
						dibujo.lineTo(125,145);
						// Ojo derecho
						dibujo.moveTo(155,120);
						dibujo.lineTo(175,145);
						dibujo.moveTo(175,120);
						dibujo.lineTo(155,145);

						dibujo.strokeStyle="blue";
						dibujo.lineWidth = 5;
						dibujo.stroke(); 
						dibujo.closePath();	
					}
				}
			}
		}
	}

}
Ahorcado.prototype.trazar = function() //Lo que va a hacer esta función es agregar un intento nuevo.
{
	this.intentos++; //cada que hago un trazo, lo que hago es sumar uno a intento.
	if(this.intentos >= this.maximo)
	{
		this.vivo = false;
		alert("Estás muerto!! Empieza nuevamente.");
	}
	this.dibujar();
}


function iniciar() 
{
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
	var canvas = document.getElementById("c");
	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext("2d"); //pudimos nombrar otra variable con el nombre "contexto", porque la de arriba es exclusivamente de "Ahorcado". Este "context" es una variable local de la función iniciar.
	hombre = new Ahorcado(contexto);

	//Convertir la palabra a mayúsculas
	palabra = palabra.toUpperCase();
	
	// Declaro un array con n espacios de acuerdo al largo de la palabra. Es el que voy a ir llenando a medida que pongo letras.
	espacio = new Array(palabra.length);

	//Agregamos una función que se ejecute al dar click al botón después de meter una letra.
	b.addEventListener("click", agregarLetra);

	mostrarTablero(espacio);
}

function agregarLetra()
{
	var letra = l.value; //"value" nos muestra el valor del HTML
	l.value = ""; //para que después de que ponga una letra, la "borremos".
	mostrarPalabra(palabra, hombre, letra); //queremos esta función, que incluya esos parámetros.

}

function mostrarPalabra(palabra, ahorcado, letra) //en lugar de "hombre", me dio la gana llamarlo "ahorcado".
{
	var encontrado = false; //Cada vez que yo le doy click, empiezo con encontrado en Falso.
	var p; 
	letra = letra.toUpperCase(); //debemos convertir a mayúsculas, que es como estamos trabajando.
	//Tengo que recorrer la palabra
	for (p in palabra) //Esta es una función especial. Es un ciclo también. p es un indicador que me dice la posición de cada letra. La p se vuelve el iterador.
	{
		//Si yo encuentro la letra en la posición de la palabra, debo cambiar encontrado a true. Pero además, debo poner la letra en el espacio correspondiente.
		if(letra == palabra[p])
		{
			espacio[p] = letra;
			encontrado = true;
		}
	}
	mostrarTablero(espacio);
	//Si NO lo encontré
	if(!encontrado)
	{
		ahorcado.trazar();
	}
}

function mostrarTablero(espacio) //por parámetro me pasa el ""espacio"
{
	var tablero = document.getElementById("tablero");
	var texto = ""; //aquí voy a ir guardando las letras que voy metiendo. Empieza vacía.
	var i; //numerito que me permitirá saber en qué punto del ciclo voy. Es una variable ITERADORA.
	var largo = espacio.length;

	// Creamos un ciclo. Para una i que empieza en cero, mientras i sea menor que el largo, suma uno a i cada que yo hago el ciclo.
	for (i = 0; i < largo; i++)
	{
		//Si en el array espacio en su posición "i", es diferente a undefined (o sea, que hay una letra), entonces muestra el texto que tengo en este momento + el elemento que esté en la posición i del array espacio + un espacio vacío
		if(espacio[i] != undefined)
		{
			texto = texto + espacio[i] + " ";		
		}
		// Si no, coloca un underscore.
		else
		{
			texto += "_ ";
		}
	}
	tablero.innerText = texto;
}