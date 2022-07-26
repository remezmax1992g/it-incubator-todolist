import React, {useState} from 'react';
import {v1} from "uuid";
import ToDoList, {TaskType} from "./ToDoList";
import './App.css';

export type FilteredValuesType = "all" | "active" | "completed";

export type TasksType ={
    [key: string]: Array<TaskType>
}

type todolistsType = {
    id: string,
    title: string,
    filter: FilteredValuesType
}

function App() {
    //data
    let todolistID1 = v1();
    let todolistID2 = v1();
    //state
    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'active'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    //function
    const changeFilter = (todolistID: string, filter: FilteredValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
        // setTasks(tasks.filter(t => t.id !== taskID))
    }
    const addTask = (todolistID: string, titleInput: string) => {
        let newTask = {id: v1(), title: titleInput, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        //setTasks([...tasks, {id: v1(), title: titleInput, isDone: false}])
    }
    const changeStatusCheckbox = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(tl => tl.id === taskID ? {...tl, isDone: isDone} : tl)})
        //setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
        console.log(tasks)
    }
    //UI
    return (
        <div className={"App"}>
            {todolists.map((tl) => {
                return ( <ToDoList
                    key={tl.id}
                    todolistID={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    filter={tl.filter}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeStatusCheckBox={changeStatusCheckbox}
                    removeTodolist={removeTodolist}
                />
                )})}
        </div>
    )
}

export default App;
