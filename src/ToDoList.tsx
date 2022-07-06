import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilteredValuesType} from "./App";
import {Button} from "./components/Button";
import {FullInput} from "./components/FullInput";
import Input from "./components/Input";

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
    addTask: (title: string) => void
}

const ToDoList = (props: ToDOListPropsType) => {
    const [title, setTitle] = useState()

   const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")

    }

    /*const onKeyAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
            if(e.key === "Enter" && e.ctrlKey === true){
                onClickAddTask()
            }
    }*/

    /*const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)*/

    const getChangeFilterHandler = (filter: FilteredValuesType) => {
        return props.changeFiler(filter)
    }

    const removeTask = (tID: string) => {props.removeTask(tID)};

    const taskListItem = props.tasks.length ? props.tasks.map((tasks, index) => {

            return (<li key={index}><input type="checkbox" checked={tasks.isDone}/>
                    <span>{tasks.title}</span>
                    <Button name={"X"} callBack={() => removeTask(tasks.id)}/>
                </li>
            )
        })
        : <span>Your taskList is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input setTitle={setTitle} title={title} callBack={onClickAddTask}/>
                <Button name={"+"} callBack={onClickAddTask}/>
                {/*<FullInput callBack={props.addTask}/>*/}
                {/*<input
                value = {title}
                onChange = {onChangeSetTitle}
                onKeyDown = {onKeyAddTask}/>

                <button onClick={onClickAddTask}>+</button>*/}
            </div>
            <ul>{taskListItem}</ul>
            <div>
                <Button name={"all"} callBack={() => getChangeFilterHandler("all")}/>
                <Button name={"active"} callBack={() => getChangeFilterHandler("active")}/>
                <Button name={"completed"} callBack={() => getChangeFilterHandler("completed")}/>
                {/*<button onClick={() => getChangeFilterHandler("all")}>All</button>
                <button onClick={() => getChangeFilterHandler("active")}>Active</button>
                <button onClick={() => getChangeFilterHandler("completed")}>Completed</button>*/}
            </div>
        </div>
    );
};

export default ToDoList;
