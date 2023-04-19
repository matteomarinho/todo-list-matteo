import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        name: newTask,
        priority,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setPriority('');
    }
  };

  const handleDelete = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleEdit = (id, name, priority) => {
    const editedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name, priority } : task
    );
    setTasks(editedTasks);
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit}>
        <label>
          Task name:
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
        </label>
        <label>
          Priority:
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button type="submit">Add task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} ({task.priority})
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleEdit(task.id, prompt('Edit task name:', task.name), prompt('Edit priority:', task.priority))}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;



