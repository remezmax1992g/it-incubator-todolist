import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";


function App() {
    const title_1: string = "What to learn";
    const title_2: string = "What to buy";
    const title_3: string = "What to exchange";
    const task_1: Array<TaskType> = [
        {id:1, title:"HTML", isDone:true},
        {id:2, title:"CSS", isDone:true},
        {id:3, title:"JS", isDone:false}
    ]
    const task_2: Array<TaskType> = [
        {id:1, title:"Milk", isDone:true},
        {id:2, title:"Oil", isDone:true},
        {id:3, title:"Meat", isDone:false}
    ]
    return (
        <div className="App">
            <ToDoList title={title_1} tasks={task_1}/>
            <ToDoList title={title_2} tasks={task_2}/>
        </div>
    );
}

export default App;
