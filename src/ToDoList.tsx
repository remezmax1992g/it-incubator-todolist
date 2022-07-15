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
    title: string
    tasks: Array<TaskType>
    filter: FilteredValuesType | undefined
    //function
    changeFilter: (filter: FilteredValuesType) => void
    removeTask: (TaskID: string) => void
    addTask: (titleInput: string) => void
    changeStatusCheckBox: (taskID: string, isDone: boolean) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    //state
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    //function
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const getChangeFilterHandler = (filter: FilteredValuesType) => {
        return props.changeFilter(filter)
    }
    const removeTask = (taskID: string) => {
        props.removeTask(taskID)
    }
    //data
    const taskListItem = props.tasks.length ? props.tasks.map((t, index) => {
        const changeStatusCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusCheckBox(t.id, event.currentTarget.checked)
        }
        return (<li key={index}><input type={"checkbox"}
                                       checked={t.isDone}
                                       onChange={changeStatusCheckbox}/>
            <span className={t.isDone ? "isDone" : "isActive"}>{t.title}</span>
            <Button nameButton={"X"} callBackOnClick={() => removeTask(t.id)} className={"buttonRemove"}/></li>)
    }) : <span>Your task's list is empty</span>
    //interface
    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <Input className={"inputName"}
                       title={title}
                       error={error}
                       callBackAddTitle={onClickAddTask}
                       setTitle={setTitle}
                       setError={setError}/>
                <Button nameButton={"+"}
                        callBackOnClick={onClickAddTask}
                        className={"buttonInputName"}/>
                {error && <div className={"error"}>You need to input task's title</div>}
                <ul className={"taskListItem"}>{taskListItem}</ul>
            </div>
            <div className={"filterButton"}>
                <Button nameButton={"all"} callBackOnClick={() => getChangeFilterHandler("all")}
                        className={props.filter === "all" ? "active" : ""}/>
                <Button nameButton={"active"} callBackOnClick={() => getChangeFilterHandler("active")}
                        className={props.filter === "active" ? "active" : ""}/>
                <Button nameButton={"completed"} callBackOnClick={() => getChangeFilterHandler("completed")}
                        className={props.filter === "completed" ? "active" : ""}/>
            </div>
        </div>
    );
};

export default ToDoList;