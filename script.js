document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskPriority = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const task = {
        text: taskInput.value,
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false
    };
    saveTask(task);
    renderTask(task);
    taskForm.reset();
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(renderTask);
}

function renderTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text} - ${task.date} - ${task.priority}</span>
        <div>
            <button class="edit" onclick="editTask('${task.text}')">Edit</button>
            <button class="delete" onclick="deleteTask('${task.text}')">Delete</button>
            <button onclick="toggleComplete('${task.text}')">${task.completed ? 'Unmark' : 'Complete'}</button>
        </div>
    `;
    li.classList.toggle('completed', task.completed);
    taskList.appendChild(li);
}

function deleteTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTasks();
}

function editTask(taskText) {
    let tasks = getTasks();
    const task = tasks.find(task => task.text === taskText);
    if (task) {
        taskInput.value = task.text;
        taskDate.value = task.date;
        taskPriority.value = task.priority;
        deleteTask(taskText);
    }
}

function toggleComplete(taskText) {
    let tasks = getTasks();
    const task = tasks.find(task => task.text === taskText);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTasks();
    }
}

function refreshTasks() {
    taskList.innerHTML = '';
    loadTasks();
}
