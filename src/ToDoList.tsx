import React, {useState, KeyboardEvent} from 'react';
import {FilteredValuesType} from "./App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type ToDOListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: string) => void;
    changeFiler: (filter: FilteredValuesType) => void
    addTasks: (title: string) => void
}

const ToDoList = (props: ToDOListPropsType) => {
    const [title, setTitle] = useState()

    const onClickAddTask = () => {
        props.addTasks(title)
        setTitle("")

    }

    const onKeyAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
            if(e.key === "Enter" && e.ctrlKey === true){
                onClickAddTask()
            }
    }

    const onChangeSetTitle = (e:KeyboardEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const getChangeFilterHandler = (filter: FilteredValuesType) => {
        return props.changeFiler(filter)
    }

    const taskListItem = props.tasks.length ? props.tasks.map((tasks, index) => {
            const removeTask = () => {
                props.removeTask(tasks.id)
            };
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
                <input
                value = {title}
                onChangeCapture = {onChangeSetTitle}
                onKeyDown = {onKeyAddTask}/>

                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>{taskListItem}</ul>
            <div>
                <button onClick={() => getChangeFilterHandler("all")}>All</button>
                <button onClick={() => getChangeFilterHandler("active")}>Active</button>
                <button onClick={() => getChangeFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;
