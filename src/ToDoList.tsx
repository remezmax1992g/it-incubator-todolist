import React, {ChangeEvent, useState} from 'react';
import Input from "./components/Input";
import Button from "./components/Button";
import {FilteredValuesType} from "./App";

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
    filter: FilteredValuesType | undefined
    //function
    changeFilter: (todolistID: string, filter: FilteredValuesType) => void
    removeTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, titleInput: string) => void
    changeStatusCheckBox: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    //state
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    //function
    const onClickAddTask = () => {
        if(title){
        props.addTask(props.todolistID, title)
        error && setError(false)}
        else {
            setError(true)
        }
        setTitle("")
    }
    const getChangeFilterHandler = (todolistID: string, filter: FilteredValuesType) => {
        return props.changeFilter(todolistID, filter)}
    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(todolistID, taskID)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    //data
    const taskListItem = props.tasks.length ? props.tasks.map((t, index) => {
        const changeStatusCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusCheckBox(props.todolistID, t.id, event.currentTarget.checked)
        }
        return (<li key={index}><input type={"checkbox"}
                                       checked={t.isDone}
                                       onChange={changeStatusCheckbox}/>
            <span className={t.isDone ? "isDone" : "isActive"}>{t.title}</span>
            <Button nameButton={"X"} callBackOnClick={() => removeTask(props.todolistID, t.id)} className={"buttonRemove"}/></li>)
    }) : <span>Your task's list is empty</span>
    //interface
    return (
        <div>
            <h2>{props.title} <Button nameButton={"X"} callBackOnClick={removeTodolist} className={"buttonRemoveTodolist"}/></h2>

            <div>
                <Input className={"inputName"}
                       title={title}
                       callBackAddTitle={onClickAddTask}
                       setTitle={setTitle}/>
                <Button nameButton={"+"}
                        callBackOnClick={onClickAddTask}
                        className={"buttonInputName"}/>
                {error && <div className={"error"}>You need to input task's title</div>}
                <ul className={"taskListItem"}>{taskListItem}</ul>
            </div>
            <div className={"filterButton"}>
                <Button nameButton={"all"} callBackOnClick={() => getChangeFilterHandler(props.todolistID,"all")}
                        className={props.filter === "all" ? "active" : ""}/>
                <Button nameButton={"active"} callBackOnClick={() => getChangeFilterHandler(props.todolistID, "active")}
                        className={props.filter === "active" ? "active" : ""}/>
                <Button nameButton={"completed"} callBackOnClick={() => getChangeFilterHandler(props.todolistID, "completed")}
                        className={props.filter === "completed" ? "active" : ""}/>
            </div>
        </div>
    );
};

export default ToDoList;