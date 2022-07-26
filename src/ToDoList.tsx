import React, {useState} from 'react';
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import {FilteredValuesType} from "./App";
import TasksItem from "./components/TasksItem/TasksItem";

export type TaskType = {
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
    //state
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    //function
    const onClickAddTask = () => {
        let newTitle = title.trim()
        if (newTitle) {
            props.addTask(props.todolistID, newTitle)
            error && setError(false)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const getChangeFilterHandler = (todolistID: string, filter: FilteredValuesType) => {
        return props.changeFilter(todolistID, filter)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    //interface
    return (
        <span className={"Todolist"}>
            <h2>{props.title} <Button nameButton={"X"} callBackOnClick={removeTodolist}
                                      className={"buttonRemoveTodolist"}/></h2>
            <span>
                <Input className={"inputName"}
                       title={title}
                       callBackAddTitle={onClickAddTask}
                       setTitle={setTitle}/>
                <Button nameButton={"+"}
                        callBackOnClick={onClickAddTask}
                        className={"buttonInputName"}/>
                {error && <div className={"error"}>You need to input task's title</div>}
                <TasksItem tasks={tasksAfterFiltering} todolistID={props.todolistID} removeTask={props.removeTask} changeStatusCheckBox={props.changeStatusCheckBox}/>
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