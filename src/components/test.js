import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleAddTodo = (event) => {
    event.preventDefault();
    const todo = event.target.elements.todo.value;
    if (todo) {
      setTodos([...todos, { id: Date.now(), text: todo }]);
      event.target.reset();
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(null);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTodo}>
        <input type="text" name="todo" placeholder="Add a to-do" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={
              selectedTodo && selectedTodo.id === todo.id
                ? `${isChecked ? 'selected completed' : 'selected'}`
                : `${isChecked ? 'completed' : ''}`
            }
            onClick={() => setSelectedTodo(todo)}
          >
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;