import React from "react";
import {useNavigate} from 'react-router-dom'
import toaster, { Toaster } from 'react-hot-toast'
import Axios from "axios";

export default function Sidebar(props){
    const navigate = useNavigate()
    const style1 = {
        backgroundColor : props.pset?"#FFF":"blue",
        color:props.pset?"black":"#FFF",
        justifyContent:props.pset?"center":"left"
    }
    const style2 = {
        backgroundColor : props.dset?"#FFF":"blue",
        color:props.dset?"black":"#FFF",
        justifyContent:props.dset?"center":"left"
    }
    function LOGOUT(){
        toaster.success("Logout Sucessfully")
        setTimeout(()=>{
            toaster.remove()   
            navigate("/")
           
         },1000)
    }
    return(
        <div className="sidebar-container">
            <Toaster position="top-center" />
            <h1>Admin</h1>
            <div style={style1} className="pb-container">
                <h3 onClick={props.setprofile} className="profile-button" >Your Profile</h3>
            </div>
            <div style={style2} className="db-container">
                <h3 onClick={props.setdetails} className="details-button" >Employee Details</h3>
            </div>
            <div>
                <h3 onClick={LOGOUT} className="logout">Logout</h3>
            </div>
        </div>
    )
}