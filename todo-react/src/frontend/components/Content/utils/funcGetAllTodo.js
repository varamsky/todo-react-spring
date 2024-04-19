import axios from "axios";
import { getAllTodo } from "../../../../redux/todo/todoActions.js";

// function to load all todo data
function funcGetAllTodo(url, dispatch, selector, effect) {
  const allTodoData = Array.from(selector((state) => state.allTodoData));

  effect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(`response = ${JSON.stringify(response)}`);
        if (response.status === 200) dispatch(getAllTodo(response.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [dispatch, url]);
  console.log(`allTodoData in er ${JSON.stringify(allTodoData)}`);

  return { allTodoData };
}
export default funcGetAllTodo;
