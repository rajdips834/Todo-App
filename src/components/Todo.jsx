import React, { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import ReactPaginate from "react-paginate";
import TodoForm from "./TodoForm";
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const [filter, setFilter] = useState("ascending");
  const filterChangeHandler = () => {
    setFilter(filter === "ascending" ? "descending" : "ascending");
  };
  useEffect(() => {
    // Apply filter logic here if needed
  }, [filter]);

  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 5;
  const pagesVisited = pageNumber * todosPerPage;

  const filteredTodos = todos.sort((a, b) =>
    filter === "ascending"
      ? a.text.localeCompare(b.text)
      : b.text.localeCompare(a.text)
  );

  const displayTodos = filteredTodos
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
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          <TiEdit
            onClick={() => {
              setEdit({ id: todo.id, value: todo.text });
            }}
            className="edit-icon"
          />
        </div>
      </div>
    ));
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const pageCount = Math.ceil(filteredTodos.length / todosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <>
      <div className="filter-container">
        <span>Sort by:</span>
        <select
          className="filter"
          value={filter}
          onChange={filterChangeHandler}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
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
