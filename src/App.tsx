import React, {useState} from 'react';
import {v1} from "uuid";
import ToDoList, {TaskType} from "./ToDoList";
import './App.css';

export type FilteredValuesType = "all" | "active" | "completed";

function App() {
    //data
    const title_1: string = "What to learn";
    const task_1: Array<TaskType> = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]

    //state
    const [filter, setFilter] = useState<FilteredValuesType>()
    const [tasks, setTasks] = useState<Array<TaskType>>(task_1)

    //function
    const changeFilter = (filter: FilteredValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskID:string) => {
       setTasks(tasks.filter(t => t.id !== taskID))
    }
    const addTask = (titleInput:string) => {
        setTasks([...tasks, {id: v1(), title: titleInput, isDone: false}])
    }
    const changeStatusCheckbox = (taskID: string, isDone:boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t))
    }
    //filter
    let tasksAfterFiltering
    switch (filter) {
        case "active":
            tasksAfterFiltering = tasks.filter(t => t.isDone === false)
            break
        case "completed":
            tasksAfterFiltering = tasks.filter(t => t.isDone === true)
            break
        default:
            tasksAfterFiltering = tasks
    }

    //UI
    return (
        <div>
            <ToDoList title={title_1}
                      tasks={tasksAfterFiltering}
                      filter={filter}

                      changeFilter={changeFilter}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatusCheckBox={changeStatusCheckbox}
            />
        </div>
    )
}

export default App;
