import React, { useState, useEffect } from "react";
import funcDeleteTodo from "../utils/funcDeleteTodo.js";
import funcUpdateTodo from "../utils/funcUpdateTodo.js";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import funcGetFullTextTodo from "../utils/funcGetFullTextTodo.js";
import { drag } from "./../utils/dragNdrop.js";

function TodoListItem(props) {
  const [showModal, setShowModal] = useState(false);
  const [changeTitle, setChangeTitle] = useState(props.listItem.title);
  const [changePriority, setChangePriority] = useState(props.listItem.priority);
  const [changeIsCompleted, setChangeIsCompleted] = useState(
    props.listItem.isCompleted
  );
  const searchText = useSelector((state) => state.searchText);
  const dispatch = useDispatch();
  const listItem = props.listItem;
  const deleteUrl = `${process.env.REACT_APP_SERVER_URL}/todos/{id}`;
  const updateUrl = `${process.env.REACT_APP_SERVER_URL}/todos/{id}`;
  const fullTextTodoUrl = `${process.env.REACT_APP_SERVER_URL}/todos/search?searchText={searchText}`;

  function handleChangePriority(e, priority) {
    e.preventDefault();
    setChangePriority(priority);
  }

  function handleTitleChange(e) {
    e.preventDefault();
    setChangeTitle(e.target.value);
  }

  function handleCloseModal(e) {
    e.preventDefault();
    setShowModal(false);
  }
  const useHandleDelete = () => {
    funcDeleteTodo(deleteUrl, listItem.id, dispatch);
    funcGetFullTextTodo(
      fullTextTodoUrl,
      searchText,
      dispatch,
      useSelector,
      useEffect
    );
  };

  const useHandleUpdate = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  function useHandleIsCompletedChange() {
    setChangeIsCompleted(!changeIsCompleted);
    funcUpdateTodo(
      updateUrl,
      listItem.id,
      "isCompleted",
      changeIsCompleted === false ? 1 : 0,
      props.listItem,
      dispatch
    );
    funcGetFullTextTodo(
      fullTextTodoUrl,
      searchText,
      dispatch,
      useSelector,
      useEffect
    );
  }

  function useHandleSubmitModal(e) {
    e.preventDefault();

    funcUpdateTodo(
      updateUrl,
      listItem.id,
      "title",
      changeTitle,
      props.listItem,
      dispatch
    );
    funcUpdateTodo(
      updateUrl,
      listItem.id,
      "priority",
      changePriority,
      props.listItem,
      dispatch
    );
    funcGetFullTextTodo(
      fullTextTodoUrl,
      searchText,
      dispatch,
      useSelector,
      useEffect
    );

    setShowModal(false);
  }

  return (
    <div
      className={`flex p-2 mx-9 my-2 md:m-2 sm:mx-9 sm:my-2 sm:p-2 ${
        listItem.priority === "LOW"
          ? "bg-yellow-50"
          : listItem.priority === "MEDIUM"
          ? "bg-yellow-200"
          : "bg-red-300"
      }`}
      draggable="true"
      onDragStart={(event) => drag(event, listItem)}
    >
      <input
        type="checkbox"
        checked={changeIsCompleted}
        onChange={useHandleIsCompletedChange}
      />
      <p
        className={`flex-1 w-80 break-words px-2 ${
          listItem.isCompleted ? "line-through" : ""
        }`}
      >
        {listItem.title}
      </p>
      <button
        className="text-green-600"
        title="Update"
        onClick={useHandleUpdate}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        className="text-red-600 ml-2"
        title="Delete"
        onClick={useHandleDelete}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      {/* Modal */}
      {showModal ? (
        <div className="w-96 h-40 fixed top-1/2 bg-white border border-black rounded-lg">
          {/* dialog */}
          <div className="relative p-8 w-full max-w-md m-auto flex-col flex">
            <button
              className="absolute right-0 top-0 mr-2 mt-2"
              onClick={handleCloseModal}
              title="Close"
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            <form onSubmit={useHandleSubmitModal}>
              <input
                type="text"
                placeholder="Enter todo"
                size="25"
                value={changeTitle}
                onChange={handleTitleChange}
                className="block m-auto px-2 border-gray-400 focus:border-black border-2 leading-10 rounded-md"
              />
              <div>
                <button
                  type="button"
                  className={`block float-left p-1 mt-5 text-sm bg-yellow-200 hover:bg-yellow-300 text-white rounded-md ${
                    changePriority === "LOW" ? "border-black border" : ""
                  }`}
                  onClick={(e) => handleChangePriority(e, "LOW")}
                >
                  LOW
                </button>
                <button
                  type="button"
                  className={`block float-left p-1 mt-5 mx-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md ${
                    changePriority === "MEDIUM" ? "border-black border" : ""
                  }`}
                  onClick={(e) => handleChangePriority(e, "MEDIUM")}
                >
                  MEDIUM
                </button>
                <button
                  type="button"
                  className={`block float-left p-1 mt-5 ml-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md ${
                    changePriority === "HIGH" ? "border-black border" : ""
                  }`}
                  onClick={(e) => handleChangePriority(e, "HIGH")}
                >
                  HIGH
                </button>
              </div>
              <button
                type="submit"
                className="block float-right p-2 mt-4 mx-2 bg-blue-600 text-white rounded-md"
              >
                Update Todo
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TodoListItem;
