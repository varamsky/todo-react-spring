import funcUpdateTodo from "./funcUpdateTodo.js";
import funcGetFullTextTodo from "./funcGetFullTextTodo.js";

let itemId = "",
  finalPriority = "",
  todo = {};
export function drag(event, listItem) {
  todo = listItem;
  itemId = listItem.id;
  event.dataTransfer.setData("text/uri-list", event.target.id);
}

export function allowDrop(event) {
  event.preventDefault();
}

export function drop(event, priority, searchText, dispatch) {
  event.preventDefault();

  finalPriority = priority;
  const updateUrl = `${process.env.REACT_APP_SERVER_URL}/todos/{id}`;

  funcUpdateTodo(updateUrl, itemId, "priority", finalPriority, todo, dispatch);

  const fullTextTodoUrl = `${process.env.REACT_APP_SERVER_URL}/todos/search?searchText={searchText}`;

  funcGetFullTextTodo(fullTextTodoUrl, searchText, dispatch);
}
