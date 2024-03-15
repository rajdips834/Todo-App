import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import db from "../firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

function TodoList() {
  // State to hold the todos
  const [todos, setTodos] = useState([]);

  // Fetch todos from Firebase when component mounts
  useEffect(() => {
    // Subscribe to changes in the "tasks" collection
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      // Map the documents to todo objects and update state
      const newTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(newTodos);
    });

    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Function to add a new todo
  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    try {
      // Add the new todo to the "tasks" collection in Firebase
      const docRef = await addDoc(collection(db, "tasks"), todo);
      // Update the local state with the new todo
      const newTodo = { id: docRef.id, ...todo };
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to update an existing todo
  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    try {
      await setDoc(doc(db, "tasks", todoId), newValue);
      // Check if todos is an array before mapping
      if (Array.isArray(todos)) {
        const updatedTodos = todos.map((todo) =>
          todo.id === todoId ? { ...todo, ...newValue } : todo
        );
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Function to remove a todo
  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      // Check if todos is an array before filtering

      const removedArr = todos.filter((todo) => todo.id !== id);
      console.log(removedArr);
      setTodos(removedArr);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  // Function to toggle the completion status of a todo
  const completeTodo = async (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    try {
      // Update the todo in the "tasks" collection in Firebase
      await setDoc(doc(db, "tasks", id), {
        isComplete: updatedTodos.find((todo) => todo.id === id).isComplete,
      });
      // Update the local state with the updated todo
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <h1 className="flex justify-center ">What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
