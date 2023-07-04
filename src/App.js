import React, { useState, useEffect } from 'react';

const TaskManagementApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Fetch tasks from API or local storage
  useEffect(() => {
    // Simulated fetch or storage retrieval
    const storedTasks = [
      { id: 1, title: 'Task 1', description: 'Task 1 description', dueDate: '2023-07-05', priority: 'high', completed: false },
      { id: 2, title: 'Task 2', description: 'Task 2 description', dueDate: '2023-07-06', priority: 'medium', completed: false },
      { id: 3, title: 'Task 3', description: 'Task 3 description', dueDate: '2023-07-07', priority: 'low', completed: true }
    ];
    setTasks(storedTasks);
  }, []);

  // Add new task
  const addTask = (title, description, dueDate, priority) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      dueDate,
      priority,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <div>
        <label>Filter:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div>
        <h2>Add New Task</h2>
        <TaskForm addTask={addTask} />
      </div>
      <div>
        <h2>Task List</h2>
        {filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} />
            ))}
          </ul>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, description, dueDate, priority);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      <label>Description:</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} required></textarea>
      <label>Due Date:</label>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      <label>Priority:</label>
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

const TaskItem = ({ task, toggleTaskCompletion }) => {
  const { id, title, description, dueDate, priority, completed } = task;

  const handleToggleCompletion = () => {
    toggleTaskCompletion(id);
  };

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handleToggleCompletion} />
      <strong>{title}</strong>
      <p>Description: {description}</p>
      <p>Due Date: {dueDate}</p>
      <p>Priority: {priority}</p>
    </li>
  );
};

export default TaskManagementApp;
