import React, { useEffect, useState } from "react";
import toaster , {Toaster} from 'react-hot-toast'
import Axios from 'axios'
import {useNavigate} from "react-router-dom";
import Addtask from "../Components/AddTask";
import PendingTasks from "../Components/PendingTasks";
import CompletedTasks from "../Components/CompletedTasks";
export default function Home(){
    const navigate = useNavigate()
    const [pass,setNPass] = useState({
        oldpassword:"",
        newpassword:""
    })
    const [name,setname] = useState("")
    const [auth,setAuth] = useState(false)
    const [openAddNew,setaddNew]  = useState(true)
    const [openPending,setPending] = useState(false)
    const [openComplete,setComplete] = useState(false)
    const [openNewPass,setPass] = useState(false)
    useEffect(()=>{
        Axios.defaults.withCredentials = true
        Axios.get('http://localhost:4000').then((res) => {
            console.log(res.data)
            if(res.data.status === "Ok"){
                setAuth(true)
                setname(res.data.email)
            }
            else{
                setAuth(false)
                returnToLogin()
            }
        })
    },[0])
    function returnToLogin(){
        navigate('/login')
    }
    function OpenAddNew(){
        setPending(false)
        setaddNew(true)
        setComplete(false)
        setPass(false)
    }
    function OpenPending(){
        setPending(true)
        setaddNew(false)
        setComplete(false)
        setPass(false)
    }
    function OpenCompleted(){
        setPending(false)
        setaddNew(false)
        setComplete(true)
        setPass(false)
    }
    function OpenChangePass(){
        setPass(!openNewPass)
    }
    function handleLogout(){
        Axios.defaults.withCredentials=true
        Axios.get('http://localhost:4000/logout').then((res) => {
            toaster.success("Logout Successfull")
            setTimeout(() => {
                toaster.remove()
                navigate('/login')
            },1000)
        })
    }
    async function handleChanePass(){
        if(pass.oldpassword !== "" && pass.newpassword !== ""){
            Axios.defaults.withCredentials=true
            await Axios.post('http://localhost:4000/changePassword',{
                oldpassword:pass.oldpassword,
                newpassword:pass.newpassword
            }).then((res) => {
                if(res.data === "Ok"){
                    toaster.success("Password Updated Successfully")
                        setTimeout(() => {
                            toaster.remove()
                            setNPass({
                                oldpassword:"",
                                newpassword:""
                            })
                            setPass(false)
                        },1000)
                }
                else{
                    toaster.error("Please Enter Correct Password")
                        setTimeout(() => {
                            toaster.remove()
                        },1000)
                }
            })
        }
    }
    const style1= {
        backgroundColor : openAddNew ? "rgba(0,0,0,0.3)" : ""
    }
    const style2= {
        backgroundColor : openPending? "rgba(0,0,0,0.3)" : ""
    }
    const style3= {
        backgroundColor : openComplete ? "rgba(0,0,0,0.3)" : ""
    }
    const ChangePass =  <div className="chpass-main">
                         <div className="chpass-form">
                           <h1>Chanege Password</h1>
                           <input type="text" placeholder="Enter Your Current Password" name="email" value={pass.oldpassword} onChange={(e) => setNPass({...pass,oldpassword:e.target.value})}/>
                           <input type="text" placeholder="Enter your New Password" name="pass" value={pass.newpassword} onChange={(e) => setNPass({...pass,newpassword:e.target.value})}/>
                           <div>
                                <button onClick={handleChanePass} className="complete-button">Update</button>
                                <button onClick={OpenChangePass} className="delete-button">Cancel</button>
                           </div>
                         </div>
                        </div>
    return(
        auth && <div className="home-container">
            <Toaster position="top-center" />
            <div className="sidebar">
                <div><h1>Todo App</h1></div>
                <div onClick={OpenAddNew} style={style1} className="option"><h2>All task</h2></div>
                <div onClick={OpenPending} style={style2} className="option"><h2>Pending Tasks</h2></div>
                <div onClick={OpenCompleted} style={style3} className="option"><h2>Completed Tasks</h2></div>
                <div onClick={OpenChangePass} className="option"><h2>Change Password</h2></div>
                <div onClick={handleLogout} className="option"><h2>Logout</h2></div>
            </div>
            <div className="other">
                {openAddNew && <Addtask/>}
                {openPending && <PendingTasks/>}
                {openComplete && <CompletedTasks/>}
                {openNewPass && ChangePass}
            </div>
        </div>
    )
}