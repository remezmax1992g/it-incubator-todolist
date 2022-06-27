import React from 'react';
import {FilteredValuesType} from "./App";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

type ToDOListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: number) => void;
    changeFiler: (filter: FilteredValuesType) => void
}

const ToDoList = (props: ToDOListPropsType) => {
    const taskListItem = props.tasks.length ? props.tasks.map((tasks, index) => {
        const removeTask = () => {props.removeTask(tasks.id)};
        return (<li key={index}><input type="checkbox" checked={tasks.isDone}/>
                <span>{tasks.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    : <span>Your taskList is empty</span>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>{taskListItem}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={() => props.changeFiler("all")}>All</button>
                <button onClick={() => props.changeFiler("active")}>Active</button>
                <button onClick={() => props.changeFiler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;
