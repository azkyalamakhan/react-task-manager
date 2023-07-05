import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from './assets/task-manager-logo.png'
import { UilTrashAlt } from '@iconscout/react-unicons'

const TaskManagementApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

 
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
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
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

  // Delete task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div class="container">
      <div class="heading">
        <img src={logo} alt="Logo" />
        <h2 class="text-center">Task Management</h2>
      </div>
      <div class="filter bg-primary-subtle">
        <label><strong>Filter :</strong></label>
        <select
          class="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option selected value="all">
            All
          </option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div class="new-task bg-primary-subtle">
        <h6>Add New Task</h6>
        <TaskForm addTask={addTask} />
      </div>

      <div class="task-list bg-primary-subtle">
        <h6>Task List</h6>
        {filteredTasks.length > 0 ? (
          <ol class="list-group list-group-numbered">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
              />
            ))}
          </ol>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, description, dueDate, priority);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="row g-4">
        <div className="col-md">
          <div class="form-floating">
            <input
              class="form-control"
              id="floatingInput"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label for="floatingInput">Title :</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <textarea
              class="form-control"
              id="floatingTextarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <label for="floatingTextarea">Description :</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
          <input
          class="form-control"
          id="floatingInput"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <label for="floatingInput">Due Date :</label>
           
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
           
            <select
              class="form-select"
              id="floatingSelect" 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label for="floatingSelect">Priority :</label>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-outline-dark">Add Task</button>
    </form>
  );
};

const TaskItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  const { id, title, description, dueDate, priority, completed } = task;

  const handleToggleCompletion = () => {
    toggleTaskCompletion(id);
  };

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  return (
    <li class="list-group-item bg-light">
      <input
        class="form-check-input me-1"
        id="firstCheckbox"
        type="checkbox"
        checked={completed}
        onChange={handleToggleCompletion}
      />
      <label class="form-check-label" for="firstCheckbox"><strong>{title}</strong></label>
      <p><strong>Description: </strong> {description}</p>
      <p><strong>Due Date: </strong> {dueDate}</p>
      <p><strong>Priority: </strong>   {priority}</p>
      <div class="delete">
      <UilTrashAlt onClick={handleDeleteTask}  color="#61DAFB" />
      </div>
    </li>
  );
};  

export default TaskManagementApp;
