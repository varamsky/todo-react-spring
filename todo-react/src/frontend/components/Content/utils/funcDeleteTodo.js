import axios from "axios";
import { deleteTodo, getAllTodo } from "../../../../redux/todo/todoActions.js";

// function to delete a todo
function funcDeleteTodo(url, id, dispatch) {
  axios
    .delete(url.replace("{id}", id))
    .then((response) => {
      if (response.status === 204) {
        // delete todo from store
        dispatch(deleteTodo(id));
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
export default funcDeleteTodo;
