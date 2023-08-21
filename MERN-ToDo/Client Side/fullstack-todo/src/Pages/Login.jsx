import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Axios from "axios";
import toaster , {Toaster} from 'react-hot-toast'
export default function Login(){
    const navigate = useNavigate()
    const [data,setdata] = useState({
        email:"",
        pass:""
    })
    function handleLogin(){
        if(data.email !== "" && data.pass !== "")
        {
            Axios.defaults.withCredentials=true
            Axios.post('http://localhost:4000/login',{
                email : data.email,
                password : data.pass
            }).then((res) => {
                if(res.data === "Login Successfull"){
                    toaster.success("Login Successfull")
                    setTimeout(() => {
                        toaster.remove()
                        navigate('/')
                    },1000)
                }
                else{
                    toaster.error(res.data)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        else{
            alert("Please Provide necessary Details")
        }
    }
    return(
        <div className="container">
            <Toaster position="top-center" />
            <h1>Welcome To Todo App</h1>
            <div className="sub-container">
                <h1>Login</h1>
                <input type="email" placeholder="Enter Your Email" name="email" value={data.email} onChange={(e) => setdata({...data,email:e.target.value})}/>
                <input type="password" placeholder="Enter your Password" name="pass" value={data.pass} onChange={(e) => setdata({...data,pass:e.target.value})}/>
                <button onClick={handleLogin} className="login-button">Login</button>
                <h3>Don't have an Account. Try <Link to="/register">Register</Link></h3>
            </div>
        </div>
    )
}