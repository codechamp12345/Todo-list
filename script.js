// Select DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load saved tasks from localStorage
document.addEventListener('DOMContentLoaded', loadSavedTasks);

// Add new task
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = todoInput.value.trim();
  if (task) {
    addTask(task);
    saveTaskToLocalStorage(task);
    todoInput.value = ''; // Clear input field
  }
});

// Add task to the list
function addTask(task) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `
    <span>${task}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Add delete functionality
  li.querySelector('.delete-btn').addEventListener('click', () => {
    removeTaskFromLocalStorage(task);
    li.remove();
  });

  todoList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load saved tasks from localStorage
function loadSavedTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => addTask(task));
}
