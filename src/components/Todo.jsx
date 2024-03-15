import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import ReactPaginate from "react-paginate";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 5; // Number of todos to display per page
  const pagesVisited = pageNumber * todosPerPage;

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
        <div>{}</div>
      </div>
    ));

  const pageCount = Math.ceil(todos.length / todosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {displayTodos}
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
