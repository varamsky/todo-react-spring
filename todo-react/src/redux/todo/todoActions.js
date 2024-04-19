import {
    GET_ALL_TODO,
    DELETE_TODO,
    ADD_TODO,
    GET_FULLTEXT_TODO,
    CHANGE_SEARCH_TEXT,
} from "./todoTypes.js";

export const getAllTodo = (allTodoData = []) => {
    return {
        type: GET_ALL_TODO,
        payload: allTodoData,
    };
};

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id,
    };
};

export const addTodo = (newTodo = {}) => {
    return {
        type: ADD_TODO,
        payload: newTodo,
    };
};

export const getFullTextTodo = (fullTextTodoData = []) => {
    return {
        type: GET_FULLTEXT_TODO,
        payload: fullTextTodoData,
    };
};

export const changeSearchText = (searchText = "") => {
    return {
        type: CHANGE_SEARCH_TEXT,
        payload: searchText,
    };
};
