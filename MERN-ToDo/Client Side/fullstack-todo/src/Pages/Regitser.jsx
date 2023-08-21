import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import toaster, { Toaster } from 'react-hot-toast'
export default function Register(){
    const navigate = useNavigate()
    const [data,setData] = useState({
        name :"",
        email:"",
        pass:"",
        con_pass:""
    })
    function handleRegister(){
        if(data.name !== "" && data.email !== "" && data.pass !== "" && data.con_pass !== "")
        {
            if(data.pass === data.con_pass){
                Axios.defaults.withCredentials=true
                Axios.post('http://localhost:4000/register',{
                    name : data.name,
                    email : data.email,
                    password : data.pass
                }).then((res) => {
                    if(res.data === "New user Added Succesfully"){
                        toaster.success("Register Successfull")
                        setTimeout(() => {
                            toaster.remove()
                            navigate('/login')
                        },1000)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
            else{
                alert("Password Does not Match")
            }
        }
        else{
            alert("Please Provide necessary Details")
        }
       
    }
    return(
        <div className="container">
            <Toaster position="top-center"/>
            <h1>Welcome To Todo App</h1>
            <div className="sub-container">
                <h1>Register</h1>
                <input type="text" placeholder="Enter Your Fullname" name="name" value={data.name} onChange={(e) => setData({...data,name:e.target.value})}/>
                <input type="email" placeholder="Enter Your Email" name="email" value={data.email} onChange={(e) => setData({...data,email:e.target.value})}/>
                <input type="password" placeholder="Create Password" name="pass" value={data.pass} onChange={(e) => setData({...data,pass:e.target.value})}/>
                <input type="password" placeholder="Re-enter Your Password" name="con_pass" value={data.con_pass} onChange={(e) => setData({...data,con_pass:e.target.value})}/>
                <button onClick={handleRegister} className="register-button">Register</button>
                <h3>Already have an account. Try <Link to="/login">Login</Link></h3>
            </div>
        </div>
    )
}