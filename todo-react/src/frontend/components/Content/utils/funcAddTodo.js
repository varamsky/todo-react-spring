import axios from "axios";
import { addTodo, getAllTodo } from "../../../../redux/todo/todoActions.js";
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
      if (response.status === 201) {
        // dispatch new todo to store
        dispatch(addTodo(response.data));
      } else {
        console.log(`Error : ERROR CODE=${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Axios Error: ${error}`);
    })
    // after the new todo is added to store get all todo to refresh UI
    .then(() => {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/todos`)
        .then((response) => {
          // disptach all todo to store
          // this refreshes the UI
          if (response.status === 200) {
            console.log(`response.data = ${JSON.stringify(response.data)}`);
            dispatch(getAllTodo(response.data));
          } else {
            console.log(`Error : ERROR CODE=${response.status.code}`);
          }
        })
        .catch((error) => console.error(`Error: ${error}`));
    })
    // after the new todo is added to store get fullText todo to refresh UI
    .then(() => {
      const fullTextUrl =
          `${process.env.REACT_APP_SERVER_URL}/todos/search`;
      funcGetFullTextTodo(fullTextUrl, searchText, dispatch);
    });
}
export default funcAddTodo;
