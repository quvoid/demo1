# 📝 Electron To-Do List App

A beautiful, cross-platform desktop to-do list application built with Electron.js, featuring a modern dark theme with glassmorphism effects.

![To-Do List App](https://img.shields.io/badge/Electron-40.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)

## ✨ Features

- ➕ **Add Tasks** - Create new tasks with a clean, intuitive interface
- ✅ **Complete Tasks** - Toggle task completion with visual feedback
- ✏️ **Edit Tasks** - Inline editing of existing tasks
- 🗑️ **Delete Tasks** - Remove tasks with a single click
- 💾 **Data Persistence** - All tasks saved to localStorage
- 📊 **Statistics Dashboard** - Real-time tracking of total, active, and completed tasks
- 🔍 **Filter Tasks** - View all, active, or completed tasks
- 🎨 **Modern UI** - Dark theme with smooth animations and glassmorphism effects

## 🖼️ Screenshots

![App Screenshot](https://via.placeholder.com/800x600/0f0f1e/667eea?text=To-Do+List+App)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone https://github.com/quvoid/demo1.git
cd demo1
```

2. Install dependencies
```bash
npm install
```

3. Run the application
```bash
npm start
```

## 📦 Building

### Create Windows Executable

```bash
npm run package
```

The executable will be created in `dist/todo-list-win32-x64/todo-list.exe`

## 🛠️ Tech Stack

- **Electron.js** - Cross-platform desktop framework
- **HTML5** - Structure
- **CSS3** - Styling with modern effects
- **JavaScript** - Application logic
- **localStorage** - Data persistence

## 📁 Project Structure

```
├── main.js           # Electron main process
├── index.html        # Application UI
├── styles.css        # Styling and animations
├── renderer.js       # Task management logic
├── package.json      # Project configuration
└── build/
    └── icon.png      # Application icon
```

## 🎯 Usage

1. **Add a Task**: Type in the input field and press Enter or click "Add Task"
2. **Complete a Task**: Click the checkbox next to the task
3. **Edit a Task**: Click the pencil icon (✏️), modify the text, and press Enter
4. **Delete a Task**: Click the trash icon (🗑️)
5. **Filter Tasks**: Use the "All", "Active", or "Completed" tabs

## 🎨 Design Features

- Vibrant purple-blue gradient theme (#667eea to #764ba2)
- Glassmorphism effects with backdrop blur
- Smooth slide-in animations
- Custom checkbox with checkmark animation
- Interactive hover effects
- Responsive layout

## 📝 License

ISC License

## 👤 Author

**quvoid**

- GitHub: [@quvoid](https://github.com/quvoid)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
