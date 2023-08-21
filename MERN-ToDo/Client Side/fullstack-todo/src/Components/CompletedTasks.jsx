import React from "react";
import  Axios from "axios";
import ShowTasks from "./Showtasks";
import toaster , {Toaster} from 'react-hot-toast'
export default function CompletedTasks(){
    const [completedtasks,setCompletedTasks] = React.useState([])
    async function loadTask(){
        Axios.defaults.withCredentials = true
        await Axios.get('http://localhost:4000/allTasks').then((res) => {
            const newcomplete = []
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].completed === true){
                    newcomplete.push(res.data[i])
                }
            }
            setCompletedTasks(newcomplete)
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
    const Tasks = completedtasks.map((task) => <ShowTasks title={task.Title} completed={task.completed} description={task.Description} onDelete={() => handleDelete(task.id)}/>)
    return(
        <div className="pendingtask-container">
            <Toaster position="top-center" />
            <h1>Your Completed Tasks</h1>
            <div className="list-container-main">
                { completedtasks.length > 0 ? Tasks : <h1 className="mess">Completed Tasks is Empty Now !</h1>}
            </div>
        </div>
    )
}