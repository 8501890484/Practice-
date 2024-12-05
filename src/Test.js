import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Test.css'; 

const Test = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = { id: Date.now(), text: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setErrorMessage('');
    } else {
      setErrorMessage('Task cannot be empty.');
    }
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditingTaskText(taskToEdit.text);
  };

  const saveTask = () => {
    if (editingTaskText.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingTaskText } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditingTaskText('');
    } else {
      setErrorMessage('Task text cannot be empty.');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do Application</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={addTask}>
          Add Task
        </button>
        {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
      </div>

      <h3>Task Summary</h3>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center`}
          >
            {editingTaskId === task.id ? (
              <input
                type="text"
                className="form-control me-3"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
              />
            ) : (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.text}
              </span>
            )}

            <div>
              {editingTaskId === task.id ? (
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={saveTask}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editTask(task.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                className={`btn btn-sm ${
                  task.completed ? 'btn-secondary' : 'btn-success'
                }`}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
