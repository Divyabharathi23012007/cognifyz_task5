


const API = "http://localhost:5000/api/tasks";

// Load tasks on page load
fetchTasks();

// Fetch and display all tasks
async function fetchTasks() {
  try {
    const res = await fetch(API);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${task.title}
        <span>
          <button onclick="deleteTask(${task.id})">🗑️</button>
          <button onclick="toggleTask(${task.id}, ${task.completed})">
            ${task.completed ? '✅' : '☑️'}
          </button>
        </span>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

// Add a new task
async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return alert("Please enter a task");

  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    input.value = "";
    fetchTasks();
  } catch (err) {
    console.error("Error adding task:", err);
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });
    fetchTasks();
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}

// Toggle task completion
async function toggleTask(id, completed) {
  try {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    });
    fetchTasks();
  } catch (err) {
    console.error("Error updating task:", err);
  }
}

