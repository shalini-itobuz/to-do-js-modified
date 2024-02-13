document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    // Load tasks from local storage
    function loadTasks() {
      taskList.innerHTML = '';
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTaskToList(task));
    }
  
    // Add task to the list
    function addTaskToList(task) {
      const li = document.createElement('li');
      li.textContent = task;
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', function() {
        deleteTask(task);
      });
  
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }
  
    // Add task
    function addTask(task) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      addTaskToList(task);
    }
  
    // Delete task
    function deleteTask(task) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const index = tasks.indexOf(task);
      if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
      }
    }
  
    // Handle form submission
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        addTask(task);
        taskInput.value = '';
      }
    });
  
    // Load tasks on page load
    loadTasks();
  });
  