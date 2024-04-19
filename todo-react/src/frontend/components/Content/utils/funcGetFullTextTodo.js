import axios from "axios";
import { getFullTextTodo } from "../../../../redux/todo/todoActions.js";

// function to load all FullText todo data
function funcGetFullTextTodo(url, searchText, dispatch) {
    axios
        .post(url, {
            searchText: searchText,
        })
        .then((response) => {
            if (response.data.status.code === "200") {
                dispatch(getFullTextTodo(response.data.payload));
            } else {
                console.log(
                    `Error : ERROR CODE=${response.data.status.code} ERROR MESSAGE=${response.data.status.message}`
                );
            }
        })
        .catch((error) => console.error(`Error: ${error}`));
}
export default funcGetFullTextTodo;
