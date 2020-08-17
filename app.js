// definimos nuestras variables
const form = document.getElementById('task-form');
const task = document.getElementById('task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');

// cargamos los eventos
loadEventListeners();

// hacemos todos los eventos
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // agregamos evento al formulario
  form.addEventListener('submit', addTask);
  // eliminamos la tarea
  taskList.addEventListener('click', removeTask);
  // eliminamos todas las tareas
  clearBtn.addEventListener('click', removeTasks);
  // filtrar tareas
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from ls
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // creamos el elemento en la lista
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        // agregamos el link para eliminar
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fas fa-trash"></i>';
        li.appendChild(link);
        // agregamos li al ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if(task.value === ''){
        alert('Add a task');
    }
    else {
        // creamos el elemento en la lista
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task.value));
        // agregamos el link para eliminar
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fas fa-trash"></i>';
        li.appendChild(link);
        // agregamos li al ul
        taskList.appendChild(li);

        // guardar en LS
        storeTaskLS(task.value);

        // limpiamos la entrada
        task.value = '';
    }

    e.preventDefault();
}

// store task
function storeTaskLS(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from ls
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

// remove from ls
function removeTaskFromLS(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove all tasks
function removeTasks() {
    if(confirm('Are you sure?')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    // clear from ls
    clearTaskLS();
}

// clear tasks from ls
function clearTaskLS() {
    localStorage.clear();
}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}