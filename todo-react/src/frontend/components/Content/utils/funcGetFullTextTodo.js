import axios from "axios";
import { getFullTextTodo } from "../../../../redux/todo/todoActions.js";

// function to load all FullText todo data
function funcGetFullTextTodo(url, searchText, dispatch) {
  console.log(`url = ${url} fullTextSearch = ${searchText}`);
  axios
    .get(url.replace("{searchText}", searchText))
    .then((response) => {
      if (response.status === 200) {
        dispatch(getFullTextTodo(response.data));
      } else {
        console.log(`Error : ERROR CODE=${response.status}`);
      }
    })
    .catch((error) => console.error(`Error: ${error}`));
}
export default funcGetFullTextTodo;
