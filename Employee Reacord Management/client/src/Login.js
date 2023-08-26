import React from "react";
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toaster, { Toaster } from 'react-hot-toast'
export default function Login(){
    const navigate=useNavigate()
    const [admin,setAdmin] = React.useState({
        mail:"",
        pass:""
    })
    async function AdminValidate(){
        const valid = await Axios.get(`http://localhost:3003/admin`)
        const ValidData = valid.data[0]
        if(ValidData.mail===admin.mail){
           if(ValidData.pass===admin.pass){
            toaster.success("Login Sucessfull")
             setTimeout(()=>{
                toaster.remove()  
                navigate("home")
             },1000)
           }
           else{
            toaster.error("Enter Correct Password")
           }
        }
        else{
            toaster.error("Enter Correct Email")
        }
    }
    return( 
        <div className="whole-container">
            <Toaster position="top-center"/>
            <div className="form-container">
                <div className="container">
                    <h2 className="title">
                        LOGIN
                    </h2>
                    <div className="input-container">
                        <h3>Email Id</h3>
                        <input type="email" placeholder="Enter Your Email Id" value={admin.mail} onChange={(e) => setAdmin({...admin,mail:e.target.value})}/>
                        <h3>Password</h3>
                        <input type="password" placeholder="Enter Your Password" value={admin.pass} onChange={(e) => setAdmin({...admin,pass:e.target.value})}/>
                    </div>
                    <button className="login-button" onClick={AdminValidate}>Login</button>
                </div>
            </div>
        </div>
    )
}