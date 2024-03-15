import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import ReactPaginate from "react-paginate";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  // State to manage the input value which will be used to edit a task
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  // Pagination related code
  const [pageNumber, setPageNumber] = useState(0); //current page number
  const todosPerPage = 5; // Number of todos to display per page
  const pagesVisited = pageNumber * todosPerPage; //

  // Slice the todos array to display only the relevant todos for the current page
  const displayTodos = todos
    .slice(pagesVisited, pagesVisited + todosPerPage)
    .map((todo, index) => (
      <div
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <div className="icons">
          {/* Delete icon */}
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          {/* Edit icon */}
          <TiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="edit-icon"
          />
        </div>
      </div>
    ));

  // Calculate the total number of pages needed for pagination
  const pageCount = Math.ceil(todos.length / todosPerPage);

  // Function to handle page change
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {displayTodos}
      {/* Pagination component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous"}
        nextLinkClassName={"next"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Todo;
