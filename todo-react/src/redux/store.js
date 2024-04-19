import { createStore, applyMiddleware } from "redux";
import todoReducer from "./todo/todoReducer.js";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

// const store = createStore(todoReducer, applyMiddleware(logger));
const store = createStore(
    todoReducer,
    composeWithDevTools(applyMiddleware(logger))
);

export default store;
