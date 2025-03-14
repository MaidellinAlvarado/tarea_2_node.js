empezamos creando variables:

fs:  para interactuar con el sistema de archivos, 

JSON.stringify una función del módulo Node.js que escribe datos en un archivo de manera síncrona. convierte un objeto o array en una cadena de texto en formato JSON.


path:  manejar rutas de archivos y directorios.

prompts: interfaces de línea de comandos interactivas.

chalk: Módulo para dar estilo y color al texto en la consola.



Despues creamos  la ruta del archivo:  tasks.json que almacenará las tareas. __dirname es una variable global en Node.js que contiene la ruta del directorio actual.


Para cargar las tareas que estan en esa ruta  con un condicional si el archivo tasks.json existe. Si no existe, lo crea con un array vacío []. 


Si tiene un archivo lee el contenido del archivo y lo parsea de JSON a un array de objetos JavaScript.



Para  guardar mis tareas,  primero las convierte a jason  las guarda en task.jason


Con un ciclo while muestra un menu iterativo  para las opciones  cualquier opcion que seleccione llama  a la funcion correspondiente 



Una vez que el usuario comienza a agregar tareas, el archivo tasks.json tendrá una estructura 



En esta tarea aprendi 

prompts: Para crear una interfaz interactiva en la línea de comandos

chalk: Para mejorar la presentación visual en la consola, usando colores y símbolos para resaltar mensajes 

async le dice a JavaScript que la función devolverá una promesa y await para pausar la ejecución hasta que una promesa se resuelva. 

tasks.push: Agrega un nuevo objeto al array de tareas.


Cuando agrego una tarea mi archivo jason se ve asi

[
  {
    "id": 1741926870993,
    "description": "COMER",
    "completed": true
  }
]


esto pasa porque fs.existsSync(tareas): Verifica si el archivo tasks.json existe. Si no existe, lo crea con un array vacío [].

fs.readFileSync(tareas, 'utf-8'): Lee el contenido del archivo tasks.json como una cadena de texto.

JSON.parse(data): Convierte la cadena de texto en un array de objetos JavaScript.



