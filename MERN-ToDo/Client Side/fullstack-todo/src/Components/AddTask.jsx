import React from "react";
import { nanoid } from "nanoid";
import Axios from 'axios'
import TodoList from "./List";
import toaster , {Toaster} from 'react-hot-toast'
export default function Addtask(props){
    const [allTasks,setallTasks] = React.useState([])
    const [newTask,setNewTask] = React.useState({
        id : "",
        Title:"",
        Description : ""
    })
    async function loadTask(){
        Axios.defaults.withCredentials = true
        await Axios.get('http://localhost:4000/allTasks').then((res) => {
            setallTasks(res.data)
        })
    }
    React.useEffect(() => {
        loadTask()
    },[0])
    async function handleDelete(id){
        Axios.defaults.withCredentials = true
        console.log(id)
        await Axios.delete('http://localhost:4000/deleteTask',
            { data: { id: id }}
        )
        toaster.success("Task Deleted")
        loadTask()
    }
    async function handleComplete(id){
        Axios.defaults.withCredentials = true
        await Axios.patch('http://localhost:4000/updateTask',{
            id:id
        })
        toaster.success("Task Completed")
        loadTask()
    }
    async function handleAddTask(){
        if(newTask.Title !== "" && newTask.Description !== ""){
            Axios.defaults.withCredentials = true
            await Axios.post('http://localhost:4000/addTask',{
                id:nanoid(),
                title:newTask.Title,
                description:newTask.Description
            }).then((res) => {
                toaster.success("Task Added")
                setNewTask({
                    id : "",
                    Title:"",
                    Description : ""
                })
                loadTask()
            })
        }
    }
    const DoList = allTasks.map((Do) => <TodoList complete={Do.completed} id={Do.id} title={Do.Title} description={Do.Description} onComplete ={()=>handleComplete(Do.id)} onDelete={() => handleDelete(Do.id)}/>)
    return(
        <div className="alltask-container">
            <Toaster position="top-center" />
            <div className="alltask-header">
                <div>
                    <h3>Title</h3>
                    <input type="text" name="Title" value={newTask.Title} onChange={(e) => setNewTask({...newTask,Title:e.target.value})}/>
                </div>
                <div>
                    <h3>Description</h3>
                    <input type="text" name="Title" value={newTask.Description} onChange={(e) => setNewTask({...newTask,Description:e.target.value})}/>
                </div>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="list-container-main">
            { allTasks.length > 0 ? DoList : <h1 className="mess">Your have No Tasks</h1>}
            </div>
        </div>
    )
}