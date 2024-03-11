import React from "react";
import { useState } from "react";
const TodoForm = (props) => {
  const [input, setInput] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="What is the task"
      />
      <button className=" bg-stone-700">Add</button>
    </form>
  );
};

export default TodoForm;
