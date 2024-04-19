import axios from "axios";
import { getAllTodo } from "../../../../redux/todo/todoActions.js";

// function to update a todo
function funcUpdateTodo(url, id, column, newValue, dispatch) {
    console.log(`id=${id}, column=${column}, newValue=${newValue}`);
    axios
        .post(url, {
            id: id,
            column: column,
            newValue: newValue,
        })
        .then((response) => {
            if (response.data.status.code === "201") {
                console.log("UPDATE SUCCESSFUL");
            } else {
                console.log(
                    `Error : ERROR CODE=${response.data.status.code} ERROR MESSAGE=${response.data.status.message}`
                );
            }
        })
        .catch((error) => {
            console.error(`Axios Error: ${error}`);
        })
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
        });
}
export default funcUpdateTodo;
