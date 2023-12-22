import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    
    const storedTodos = sessionStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    
    const todosJson = JSON.stringify(todos);
    sessionStorage.setItem('todos', todosJson);
    localStorage.setItem('todos', todosJson);
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos((prevTodos) => [
        {
          id: Date.now(),
          text: input,
          completed: false,
        },
        ...prevTodos,
      ]);
      setInput('');
    }
  };

  const completeTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      );
      return [
        ...updatedTodos.filter((todo) => !todo.completed),
        ...updatedTodos.filter((todo) => todo.completed),
      ];
    });
  };

  const resetTodos = () => {
    setTodos([]);
  };

  return (
    <div className="app-container">
      <div className='logo'>📝ToDo App</div>
    <div className="app">
    <h1 className="h1name">📅My ToDo App</h1>
      <div className="header">
        
        <input
          type="text"
          placeholder="Hi👋Add your new TODO"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add➕</button>
        <button onClick={resetTodos}>Reset🔄</button>
      </div>

      <div className="todo-list">
        <h2>Active Todos</h2>
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.completed ? 'completed' : ''}`}
              onClick={() => completeTodo(todo.id)}
            >
              {todo.text}✅
            </div>
          ))}
        <h2>Completed Todos</h2>
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <div key={todo.id} className="todo-card completed">
              {todo.text}
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default App;
