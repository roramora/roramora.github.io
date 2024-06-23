document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearTasksBtn = document.getElementById('clearTasksBtn');
    const modal = document.getElementById('taskModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const taskForm = document.getElementById('taskForm');
    const columns = document.querySelectorAll('.column');
    let draggedTask = null;
    let tasks = [];
  
    flatpickr("#taskDueDate", {
      dateFormat: "Y-m-d",
      allowInput: true
    });
  
    function createTask(id, title, severity, dueDate, column) {
      const task = document.createElement('div');
      task.className = 'task';
      task.draggable = true;
      task.dataset.id = id;
      task.innerHTML = `
        <div class="task-content">
          <h3>${title}</h3>
          <p>Due: ${dueDate}</p>
          <span class="severity ${severity}">${severity}</span>
        </div>
        <button class="delete-btn">&times;</button>
      `;
      task.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task));
      document.getElementById(column).querySelector('.task-container').appendChild(task);
      addDragListeners(task);
      return task;
    }
  
    function deleteTask(task) {
      task.remove();
      tasks = tasks.filter(t => t.id !== task.dataset.id);
      saveToStorage();
    }
  
    function saveToStorage() {
      localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }
  
    function loadFromStorage() {
      const storedTasks = localStorage.getItem('kanbanTasks');
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
          createTask(task.id, task.title, task.severity, task.dueDate, task.column);
        });
      }
    }
  
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  
    const debouncedSave = debounce(saveToStorage, 300);
  
    addTaskBtn.onclick = () => {
      modal.style.display = "block";
    }
  
    clearTasksBtn.onclick = () => {
      if (confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
        tasks = [];
        document.querySelectorAll('.task-container').forEach(container => {
          container.innerHTML = '';
        });
        saveToStorage();
      }
    }
  
    closeBtn.onclick = () => {
      modal.style.display = "none";
    }
  
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  
    taskForm.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('taskTitle').value;
      const severity = document.getElementById('taskSeverity').value;
      const dueDate = document.getElementById('taskDueDate').value;
      
      if (!dueDate) {
        alert("Please select a due date.");
        return;
      }
      
      const id = Date.now().toString();
      const newTask = {
        id,
        title,
        severity,
        dueDate,
        column: 'todo'
      };
      tasks.push(newTask);
      createTask(id, title, severity, dueDate, 'todo');
      debouncedSave();
      modal.style.display = "none";
      taskForm.reset();
    }
  
    function addDragListeners(task) {
      task.addEventListener('dragstart', dragStart);
      task.addEventListener('dragend', dragEnd);
    }
  
    function dragStart(e) {
      draggedTask = e.target;
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
      setTimeout(() => e.target.classList.add('dragging'), 0);
    }
  
    function dragEnd(e) {
      e.target.classList.remove('dragging');
      draggedTask = null;
      columns.forEach(column => column.classList.remove('drag-over'));
    }
  
    columns.forEach(column => {
      column.addEventListener('dragover', dragOver);
      column.addEventListener('dragenter', dragEnter);
      column.addEventListener('dragleave', dragLeave);
      column.addEventListener('drop', drop);
    });
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function dragEnter(e) {
      e.preventDefault();
      e.target.closest('.column').classList.add('drag-over');
    }
  
    function dragLeave(e) {
      e.target.closest('.column').classList.remove('drag-over');
    }
  
    function drop(e) {
      e.preventDefault();
      const column = e.target.closest('.column');
      column.classList.remove('drag-over');
      if (column && draggedTask) {
        column.querySelector('.task-container').appendChild(draggedTask);
        const taskId = draggedTask.dataset.id;
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          tasks[taskIndex].column = column.id;
          debouncedSave();
        }
      }
    }
  
    loadFromStorage();
  });