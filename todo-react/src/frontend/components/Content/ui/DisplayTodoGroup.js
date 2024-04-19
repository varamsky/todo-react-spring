import React from "react";
import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem.js";
import { drop, allowDrop } from "./../utils/dragNdrop.js";

function DisplayTodoGroup(props) {
    const id = props.id;
    const notCompletedTodo = props.notCompletedTodo;
    const completedTodo = props.completedTodo;
    const priority = props.priority;
    const dispatch = props.dispatch;

    const searchText = useSelector((state) => state.searchText);

    return (
        <div
            id={id}
            onDrop={(event) => drop(event, priority, searchText, dispatch)}
            onDragOver={(event) => allowDrop(event)}
        >
            <div className="font-bold ml-2">{priority}</div>
            {notCompletedTodo !== null
                ? notCompletedTodo.map((element) => {
                      return (
                          <TodoListItem key={element.id} listItem={element} />
                      );
                  })
                : null}
            {completedTodo.map((element) => {
                return <TodoListItem key={element.id} listItem={element} />;
            })}
            {(notCompletedTodo === null && completedTodo.length === 0) ||
            (notCompletedTodo !== null &&
                completedTodo.length === 0 &&
                notCompletedTodo.length === 0) ? (
                <p className="w-96 ml-2">No Todo Added</p>
            ) : null}
        </div>
    );
}

export default DisplayTodoGroup;
