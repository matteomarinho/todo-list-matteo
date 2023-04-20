import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks ? storedTasks : [];
  });
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim()) {
      const task = {
        checked: false,
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

  const handleCheck = (id) => {
    const checkedTasks = tasks.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTasks(checkedTasks);
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
            <button className="buttonCheck" onClick={() => handleCheck(task.id)}>
              Done
            </button>
            <span className={task.checked ? 'completed' : ''}>
              {task.name} ({task.priority})
            </span>
            <button
              className="buttonEdit"
              onClick={() =>
                handleEdit(
                  task.id,
                  prompt('Edit task name:', task.name),
                  prompt('Edit priority:', task.priority)
                )
              }
            >
              Edit
            </button>
            <button className="buttondelete" onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;