import React from "react";
import toaster , {Toaster} from 'react-hot-toast'
import  Axios from "axios";
import ShowTasks from "./Showtasks";
export default function PendingTasks(){
    const [pendingtasks,setPendingTasks] = React.useState([])
    async function loadTask(){
        Axios.defaults.withCredentials = true
        await Axios.get('http://localhost:4000/allTasks').then((res) => {
            const newpending = []
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].completed === false){
                    newpending.push(res.data[i])
                }
            }
            setPendingTasks(newpending)
        })
    }
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
    React.useEffect(() => {
        loadTask()
    },[0])
    const Tasks = pendingtasks.map((task) => <ShowTasks title={task.Title} completed={task.completed} description={task.Description} onComplete ={()=>handleComplete(task.id)} onDelete={() => handleDelete(task.id)}/>)
    return(
        <div className="pendingtask-container">
            <Toaster position="top-center" />
            <h1>Your Pending Tasks</h1>
            <div className="list-container-main">
            { pendingtasks.length > 0 ? Tasks : <h1 className="mess">There is No Pending Tasks</h1>}
            </div>
        </div>
    )
}