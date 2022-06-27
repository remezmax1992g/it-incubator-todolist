import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

export type FilteredValuesType = "all"|"active"|"completed";



function App() {
    const title_1: string = "What to learn";
    /*const title_2: string = "What to buy";
    const title_3: string = "What to exchange";*/

    const task_1: Array<TaskType> = [
        {id:1, title:"HTML", isDone:true},
        {id:2, title:"CSS", isDone:true},
        {id:3, title:"JS", isDone:false},
        {id:4, title:"React", isDone:false},
        {id:5, title:"Redux", isDone:false},
    ]
    const [tasks, setTasks] = useState(task_1);
    const removeTask1 = (taskID:number) => {
        setTasks(tasks.filter(task => task.id !== taskID));
    }
    const [filter, setFilter] = useState<FilteredValuesType>()

    let taskForRender;
    switch (filter) {
        case "completed":
            taskForRender = tasks.filter(t => t.isDone === true)
            break
        case "active":
            taskForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            taskForRender = tasks
    }

    const changeFilter = (filter : FilteredValuesType) =>{
        setFilter(filter)
    }



    /*function removeTask(id: number) {
        let resultTask = task_1.filter(t => t.id != id);
        console.log(resultTask);
    }*/


    return (
        <div className="App">
            <ToDoList title={title_1}
                      tasks={taskForRender}
            removeTask ={removeTask1}
            changeFiler={changeFilter}/>
            {/*<ToDoList title={title_2}
                      tasks={task_2}/
                removeTask ={removeTask}/>*/}
        </div>
    );
}

export default App;
