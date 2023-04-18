import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

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
      className={selectedTodo && selectedTodo.id === todo.id ? 'selected' : ''}
      onClick={() => setSelectedTodo(todo)} 
      >
        
      {todo.text}
      <button onClick={() => handleDeleteTodo(todo.id)}>remove</button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default TodoList;



