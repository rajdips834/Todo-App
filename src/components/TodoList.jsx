import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodos = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  useEffect(() => {
    console.log(...todos);
  }, [todos]);

  return (
    <div>
      <div>Hi what's up</div>
      <TodoForm onSubmit={addTodos} />
    </div>
  );
};

export default TodoList;
