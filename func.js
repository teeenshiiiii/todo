document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskDate = document.getElementById('task-date').value;
        const taskName = document.getElementById('task-name').value;

        const taskId = taskForm.dataset.editing;
        
        if (taskId) {

            tasks[taskId] = { date: taskDate, task: taskName };
            taskForm.removeAttribute('data-editing');
        } else {

            tasks.push({ date: taskDate, task: taskName });
        }
        
        saveTasks();
        renderTasks();
        taskForm.reset();
    });

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${task.date}</td>
                <td>${task.task}</td>
                <td>
                    <button class="edit" data-id="${index}">Edit</button>
                    <button class="delete" data-id="${index}">Delete</button>
                </td>
            `;
            taskList.appendChild(row);
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        const editButtons = document.querySelectorAll('.edit');
        const deleteButtons = document.querySelectorAll('.delete');

        editButtons.forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    }

    function handleEdit(e) {
        const taskId = e.target.dataset.id;
        const task = tasks[taskId];

        document.getElementById('task-date').value = task.date;
        document.getElementById('task-name').value = task.task;
        taskForm.dataset.editing = taskId;
    }

    function handleDelete(e) {
        const taskId = e.target.dataset.id;
        tasks.splice(taskId, 1);

        saveTasks();
        renderTasks();
    }
});
