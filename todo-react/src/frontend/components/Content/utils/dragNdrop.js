import funcUpdateTodo from "./funcUpdateTodo.js";
import funcGetFullTextTodo from "./funcGetFullTextTodo.js";

let itemId = "",
    finalPriority = "";
export function drag(event, id) {
    itemId = id;
    event.dataTransfer.setData("text/uri-list", event.target.id);
}

export function allowDrop(event) {
    event.preventDefault();
}

export function drop(event, priority, searchText, dispatch) {
    event.preventDefault();

    finalPriority = priority;
    const updateUrl = `http://13.233.99.122/src/backend/utils/todo.php?action=UPDATE_TODO`;

    funcUpdateTodo(updateUrl, itemId, "priority", finalPriority, dispatch);

    const fullTextTodoUrl =
        "http://13.233.99.122/src/backend/utils/todo.php?action=GET_FULLTEXT_TODO";

    funcGetFullTextTodo(
        fullTextTodoUrl,
        searchText,
        dispatch,
    );
}
