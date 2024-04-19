import axios from "axios";
import { getAllTodo } from "../../../../redux/todo/todoActions.js";

// function to update a todo
function funcUpdateTodo(url, id, column, newValue, newTodo, dispatch) {
  console.log(
    `id=${id}, column=${column}, newValue=${newValue}, newTodo=${JSON.stringify(
      newTodo
    )}`
  );
  if (column === "isCompleted") {
    console.log(`column ss`);
    newValue = newValue === 1 ? true : false;
    console.log(`newValue = ${newValue}`);
  }
  newTodo[column] = newValue;
  console.log(`newValue = ${newTodo[column]}`);
  console.log(`newTodo = ${JSON.stringify(newTodo)}`);
  axios
    .put(url.replace("{id}", id), {
      title: newTodo.title,
      isCompleted: newTodo.isCompleted,
      priority: newTodo.priority,
    })
    .then((response) => {
      if (response.status === 201) {
        console.log("UPDATE SUCCESSFUL");
      } else {
        console.log(`Error : ERROR CODE=${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Axios Error: ${error}`);
    })
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
    });
}
export default funcUpdateTodo;
