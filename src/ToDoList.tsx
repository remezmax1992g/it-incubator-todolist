import React from 'react';
import Button from "./components/Button/Button";
import {FilteredValuesType} from "./App";
import TasksItem from "./components/TasksItem/TasksItem";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";

export type TaskType = {
    //value
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    //value
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilteredValuesType
    //function
    changeFilter: (todolistID: string, filter: FilteredValuesType) => void
    removeTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, titleInput: string) => void
    changeStatusCheckBox: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    editTask:(todolistID: string, taskID: string, newTitle: string) => void
    editToDoList:(todolistID: string, newTitle: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    //filtering
    let tasksAfterFiltering: Array<TaskType>
    switch (props.filter) {
        case "active":
            tasksAfterFiltering = props.tasks.filter(t => !t.isDone )
            break
        case "completed":
            tasksAfterFiltering = props.tasks.filter(t => t.isDone )
            break
        default:
            tasksAfterFiltering = props.tasks
    }
    //function
    const getChangeFilterHandler = (todolistID: string, filter: FilteredValuesType) => {
        return props.changeFilter(todolistID, filter)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const addItemHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle)
    }
    const editToDoListHandler = (newTitle: string) => {
        props.editToDoList(props.todolistID, newTitle)
    }
    //interface
    return (
        <span className={"Todolist"}>
            <h2>
                <EditableSpan title={props.title} onChange={editToDoListHandler}/>
                <Button className={"buttonRemoveTodolist"} nameButton={"X"} callBackOnClick={removeTodolist}/>
            </h2>
            <span>
                <AddItemForm addTask={addItemHandler}/>
                <TasksItem tasks={tasksAfterFiltering} todolistID={props.todolistID} removeTask={props.removeTask} changeStatusCheckBox={props.changeStatusCheckBox} editTask={props.editTask}/>
            </span>
            <div className={"filterButton"}>
                <Button nameButton={"all"} callBackOnClick={() => getChangeFilterHandler(props.todolistID, "all")}
                        className={props.filter === "all" ? "active" : ""}/>
                <Button nameButton={"active"} callBackOnClick={() => getChangeFilterHandler(props.todolistID, "active")}
                        className={props.filter === "active" ? "active" : ""}/>
                <Button nameButton={"completed"}
                        callBackOnClick={() => getChangeFilterHandler(props.todolistID, "completed")}
                        className={props.filter === "completed" ? "active" : ""}/>
            </div>
        </span>
    );
};

export default ToDoList;