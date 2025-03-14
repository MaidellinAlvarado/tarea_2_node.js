const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

const tareas = path.join(__dirname, 'tasks.json');

function cargar_tareas() {
    if (!fs.existsSync(tareas)) {
        fs.writeFileSync(tareas, '[]');
        return [];
    }
    const data = fs.readFileSync(tareas, 'utf-8');
    return JSON.parse(data);
}


function guardar_task(tasks) {
    fs.writeFileSync(tareas, JSON.stringify(tasks, null, 2));
}


async function mainMenu() {
    const { action } = await prompts({
        type: 'select',
        name: 'action',
        message: '¿Qué deseas hacer?',
        choices: [
            { title: 'Agregar tarea', value: 'add' },
            { title: 'Listar tareas', value: 'list' },
            { title: 'Marcar tarea como completada', value: 'complete' },
            { title: 'Eliminar tarea', value: 'delete' },
            { title: 'Salir', value: 'exit' }
        ]
    });

    switch (action) {
        case 'add':
            await addTask();
            break;
        case 'list':
            listTasks();
            break;
        case 'complete':
            await completeTask();
            break;
        case 'delete':
            await deleteTask();
            break;
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log(chalk.red('Opción no válida'));
            break;
    }

    mainMenu();
}

async function addTask() {
    const { task } = await prompts({
        type: 'text',
        name: 'task',
        message: 'Describe la tarea:'
    });

    const tasks = cargar_tareas(); 
    tasks.push({ id: Date.now(), description: task, completed: false });
    guardar_task(tasks); 
    console.log(chalk.green('Tarea agregada'));
}


function listTasks() {
    const tasks = cargar_tareas();
    if (tasks.length === 0) {
        console.log(chalk.yellow('No tareas pendientes'));
        return;
    }
    tasks.forEach((task, index) => {
        const status = task.completed ? chalk.blue ('HECHA') : chalk.red('PENDIENTE');
        console.log(`${index + 1}. [${status}] ${task.description}`);
    });
}


async function completeTask() {
    const tasks = cargar_tareas();
    const { taskIndex } = await prompts({
        type: 'number',
        name: 'taskIndex',
        message: 'Ingresa el número de la tarea a marcar como completada:',
        validate: value => value > 0 && value <= tasks.length ? true : 'Número de tarea no válido'
    });

    tasks[taskIndex - 1].completed = true;
    guardar_task(tasks);
    console.log(chalk.green('Tarea marcada como completada'));
}

// Eliminar una tarea
async function deleteTask() {
    const tasks = cargar_tareas();
    const { taskIndex } = await prompts({
        type: 'number',
        name: 'taskIndex',
        message: 'Ingresa el número de la tarea a eliminar:',
        validate: value => value > 0 && value <= tasks.length ? true : 'Número de tarea no válido'
    });

    tasks.splice(taskIndex - 1, 1);
    guardar_task(tasks);
    console.log(chalk.green('Tarea eliminada con éxito'));
}

mainMenu();