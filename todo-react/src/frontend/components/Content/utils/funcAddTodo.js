import axios from "axios";
import {
    addTodo,
    getAllTodo,
} from "../../../../redux/todo/todoActions.js";
import funcGetFullTextTodo from "./funcGetFullTextTodo.js";

// function to add a todo
function funcAddTodo(allTodoUrl, searchText, newTodo, dispatch) {
    // AJAX call to post new todo data to server
    axios
        .post(allTodoUrl, {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
            priority: newTodo.priority,
        })
        .then((response) => {
            if (response.data.status.code === "201") {
                // dispatch new todo to store
                dispatch(addTodo(response.data.payload));
            } else {
                console.log(
                    `Error : ERROR CODE=${response.data.status.code} ERROR MESSAGE=${response.data.status.message}`
                );
            }
        })
        .catch((error) => {
            console.error(`Axios Error: ${error}`);
        })
        // after the new todo is added to store get all todo to refresh UI
        .then(() => {
            axios
                .get(
                    "http://13.233.99.122/src/backend/utils/todo.php?action=GET_ALL_TODO"
                )
                .then((response) => {
                    // disptach all todo to store
                    // this refreshes the UI
                    if (response.data.status.code === "200") {
                        dispatch(getAllTodo(response.data.payload));
                    } else {
                        console.log(
                            `Error : ERROR CODE=${response.data.status.code} ERROR MESSAGE=${response.data.status.message}`
                        );
                    }
                })
                .catch((error) => console.error(`Error: ${error}`));
        })
        // after the new todo is added to store get fullText todo to refresh UI
        .then(() => {
            const fullTextUrl =
                "http://13.233.99.122/src/backend/utils/todo.php?action=GET_FULLTEXT_TODO";
            funcGetFullTextTodo(fullTextUrl, searchText, dispatch);
        });
}
export default funcAddTodo;
