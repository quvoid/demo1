// Data Model
let tasks = [];
let currentGeneralTab = 'general'; // 'general' or 'roadmap'

// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskTypeSelect = document.getElementById('taskType');
const addBtn = document.getElementById('addBtn');
const dailyList = document.getElementById('dailyList');
const monthlyList = document.getElementById('monthlyList');
const generalList = document.getElementById('generalList');
const dailyEmpty = document.getElementById('dailyEmpty');
const monthlyEmpty = document.getElementById('monthlyEmpty');
const generalEmpty = document.getElementById('generalEmpty');
const dailyCount = document.getElementById('dailyCount');
const monthlyCount = document.getElementById('monthlyCount');
const dailyProgress = document.getElementById('dailyProgress');
const monthlyProgress = document.getElementById('monthlyProgress');
const generalTabBtn = document.querySelector('[data-tab="general"]');
const roadmapTabBtn = document.querySelector('[data-tab="roadmap"]');
const generalTabContent = document.getElementById('generalTab');
const roadmapTabContent = document.getElementById('roadmapTab');

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        // Migration: Ensure all tasks have a type, default to 'general'
        tasks.forEach(task => {
            if (!task.type) task.type = 'general';
        });
        saveTasks(); // Save back with types
        renderAll();
    }
}

// Save tasks
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    const type = taskTypeSelect.value;

    if (text === '') {
        taskInput.focus();
        return;
    }

    const task = {
        id: generateId(),
        text: text,
        type: type, // 'daily', 'monthly', 'general'
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    taskInput.value = '';
    saveTasks();
    renderAll();
    taskInput.focus();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderAll();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderAll();
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const taskTextEl = taskItem.querySelector('.task-text');

    taskTextEl.contentEditable = true;
    taskTextEl.focus();
    taskItem.classList.add('editing');

    const range = document.createRange();
    range.selectNodeContents(taskTextEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    const saveEdit = () => {
        const newText = taskTextEl.textContent.trim();
        if (newText !== '') {
            task.text = newText;
            saveTasks();
        }
        taskTextEl.contentEditable = false;
        taskItem.classList.remove('editing');
        renderAll(); // Re-render to ensure state consistency
    };

    taskTextEl.addEventListener('blur', saveEdit, { once: true });
    taskTextEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            taskTextEl.blur();
        }
        if (e.key === 'Escape') {
            taskTextEl.textContent = task.text;
            taskTextEl.blur();
        }
    });
}

// Render a specific list (common logic)
function renderList(listTasks, listElement, emptyElement) {
    if (listTasks.length === 0) {
        listElement.style.display = 'none';
        emptyElement.style.display = 'block';
    } else {
        listElement.style.display = 'block';
        emptyElement.style.display = 'none';
        listElement.innerHTML = listTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''} type-${task.type}" data-id="${task.id}">
                <div class="task-checkbox" onclick="toggleTask('${task.id}')"></div>
                <span class="task-text">${escapeHtml(task.text)}</span>
                <div class="task-actions">
                    <button class="task-btn edit-btn" onclick="editTask('${task.id}')" title="Edit">✏️</button>
                    <button class="task-btn delete-btn" onclick="deleteTask('${task.id}')" title="Delete">🗑️</button>
                </div>
            </li>
        `).join('');
    }
}

// Update UI Stats & Progress
function updateStats(type, totalCount, completedCount, badgeEl, progressEl) {
    if (badgeEl) badgeEl.textContent = `${completedCount}/${totalCount}`;

    if (progressEl) {
        const percent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
        progressEl.style.width = `${percent}%`;

        // Color based on progress
        if (percent === 100) {
            progressEl.style.backgroundColor = '#10b981'; // Green
        } else {
            progressEl.style.backgroundColor = '#667eea'; // Default Purple
        }
    }
}

// Main Render Function
function renderAll() {
    // 1. Separate tasks
    const dailyTasks = tasks.filter(t => t.type === 'daily');
    const monthlyTasks = tasks.filter(t => t.type === 'monthly');
    const generalTasks = tasks.filter(t => t.type === 'general');

    // 2. Render Lists
    renderList(dailyTasks, dailyList, dailyEmpty);
    renderList(monthlyTasks, monthlyList, monthlyEmpty);
    renderList(generalTasks, generalList, generalEmpty);

    // 3. Update Daily Stats
    const dailyCompleted = dailyTasks.filter(t => t.completed).length;
    updateStats('daily', dailyTasks.length, dailyCompleted, dailyCount, dailyProgress);

    // 4. Update Monthly Stats
    const monthlyCompleted = monthlyTasks.filter(t => t.completed).length;
    updateStats('monthly', monthlyTasks.length, monthlyCompleted, monthlyCount, monthlyProgress);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Tab Switching (General vs Roadmap)
function switchTab(tab) {
    currentGeneralTab = tab;

    if (tab === 'general') {
        generalTabBtn.classList.add('active');
        roadmapTabBtn.classList.remove('active');
        generalTabContent.classList.add('active');
        roadmapTabContent.classList.remove('active');
    } else {
        generalTabBtn.classList.remove('active');
        roadmapTabBtn.classList.add('active');
        generalTabContent.classList.remove('active');
        roadmapTabContent.classList.add('active');
    }
}

generalTabBtn.addEventListener('click', () => switchTab('general'));
roadmapTabBtn.addEventListener('click', () => switchTab('roadmap'));

// Initial Load
loadTasks();
