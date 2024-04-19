import axios from "axios";
import { deleteTodo } from "../../../../redux/todo/todoActions.js";

// function to delete a todo
function funcDeleteTodo(url, id, dispatch) {
    const headers = {
        "Content-Type": "application/json",
    };
    const data = {
        id: id,
    };

    axios
        .delete(url, { headers, data })
        .then((response) => {
            if (response.data.status.code === "200") {
                // delete todo from store
                dispatch(deleteTodo(id));
            } else {
                console.log(
                    `Error : ERROR CODE=${response.data.status.code} ERROR MESSAGE=${response.data.status.message}`
                );
            }
        })
        .catch((error) => {
            console.error(`Axios Error: ${error}`);
        });
}
export default funcDeleteTodo;
