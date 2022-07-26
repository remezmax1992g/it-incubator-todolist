import React, {ChangeEvent} from 'react';
import {TaskType} from "../../ToDoList";
import Button from "../Button/Button";
import EditableSpan from "../EditableSpan/EditableSpan";

type TaskItemTypeProps ={
    //value
    todolistID: string
    tasks: Array<TaskType>
    //function
    changeStatusCheckBox: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTask: (todolistID: string, taskID: string) => void
    editTask:(todolistID: string, taskID: string, newTitle: string) => void
}

const TasksItem = (props: TaskItemTypeProps) => {
    //function
    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(todolistID, taskID)
    }
    const editTaskHandler = (taskID: string, newTitle: string) => {
        props.editTask(props.todolistID,taskID, newTitle)
    }
    //value
    const taskListItem = props.tasks.length ? props.tasks.map((t, index) => {
        const changeStatusCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusCheckBox(props.todolistID, t.id, event.currentTarget.checked)
        }
        return (<li key={index}><input type={"checkbox"}
                                       checked={t.isDone}
                                       onChange={changeStatusCheckbox}/>
           <EditableSpan title={t.title} isDone={t.isDone} onChange={(title) => editTaskHandler(t.id, title)}/>
            <Button nameButton={"X"} callBackOnClick={() => removeTask(props.todolistID, t.id)}
                    className={"buttonRemove"}/></li>)
    }) : <span>Your task's list is empty</span>


    return (
        <span>
            <ul className={"taskListItem"}>{taskListItem}</ul>
        </span>
    );
};

export default TasksItem;