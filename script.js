document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage
  function loadTasks() {
    taskList.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToList(task.task, task.completed));
  }

  // Add task to the list
  function addTaskToList(task, completed) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function () {
      updateTaskStatus(li, task, this.checked);
    });
    li.appendChild(checkbox);

    const taskText = document.createElement("span");
    taskText.textContent = task;
    li.appendChild(taskText);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task);
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    if (completed) {
      li.classList.add("completed");
    }
  }

  // Add task
  function addTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const lowerCaseTask = task.toLowerCase();
    const existingTaskIndex = tasks.findIndex(
      (t) => t.task.toLowerCase() === lowerCaseTask
    );
    if (existingTaskIndex === -1) {
      tasks.push({ task: task, completed: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      addTaskToList(task, false);
    } else {
      alert("Task already exists with the same name! 😉");
    }
  }

  // Update task status
  function updateTaskStatus(li, task, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((t) => {
      if (t.task === task) {
        t.completed = completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  }

  // Delete task
  function deleteTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex((t) => t.task === task);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    }
  }

  // Handle add task
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
      addTask(task);
      taskInput.value = "";
    }
  });

  // Load task
  loadTasks();
});
