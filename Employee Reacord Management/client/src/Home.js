import React from "react";
import Sidebar from "./pages/Sidebar";
import Adminprofile from "./pages/AdminProfile";
import Employee from "./pages/Employee";
import Axios from "axios";
export default function Home(props){
    const [profile,setProfile] = React.useState(true)
    const [details,setDetails] = React.useState(false)
    function profileOn(){
        setProfile(true)
        setDetails(false)
        console.log(profile,details)
    }
    function detailsOn(){
        setProfile(false)
        setDetails(true)
        console.log(profile,details)
    }
    return(
        <div className="home-container">
            <Sidebar setprofile={() => profileOn()} setdetails={() => detailsOn()} pset={profile} dset={details}/>
            {profile && <Adminprofile />}
            {details && <Employee/>}
        </div>
    )
}
