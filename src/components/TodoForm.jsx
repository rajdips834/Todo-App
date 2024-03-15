import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  // State to manage the input value
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  // Reference to the input element to focus on it
  const inputRef = useRef(null);

  // Focus on the input element when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  });

  // Update the input value as it changes
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit the todo item with a random id
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  // Render the form based on whether it's for adding or editing a todo
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        // Edit mode: input field with update button
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        // Add mode: input field with add button
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
