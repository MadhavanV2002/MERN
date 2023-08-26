import React from "react";
import logo from '../images/admin.png'
import Axios  from "axios";
import toast, { Toaster } from "react-hot-toast"
export default function Adminprofile(){
    const [adminData,setadminData] = React.useState({
        mail:"",
        pass:"",
        firstname:"",
        lastname:"",
        age:"",
        role:"",
        phone:"",
        address:""
    })
    const [editedData,seteditedData] = React.useState({})
    const [updatedPass,setupdatedPass] = React.useState({
        currentpass:"",
        newpass:""
    })
    const [editMode,setEditMode] = React.useState(false)
    const [chpass,setChpass] = React.useState(false)
    async function loadData(){
        const Data = await Axios.get(`http://localhost:3003/admin`)
        const d=Data.data[0]
        setadminData(d)
        seteditedData({
            mail:d.mail,
            firstname:d.firstname,
            lastname:d.lastname,
            age:d.age,
            role:d.role,
            phone:d.phone,
            address:d.address,
            pass:d.pass
        })
    }
    React.useEffect(()=>{
        loadData()
    },[])
    function openEdit(){
        setEditMode(true)
    }
    function closeEdit(){
        setEditMode(false)
    }
    function openPass(){
        setChpass(true)
    }
    function closePass(){
        setChpass(false)
    }
    async function handleSubmit(){
        Axios.put(`http://localhost:3003/admin/1`,{
            ...editedData
        })
        setTimeout(() => {
            loadData()
            setEditMode(false)
            toast.success("Details Updated Sucessfully")
        },500)
    }
    async function handlePass(){
        if(adminData.pass === updatedPass.currentpass){
            const newPass = updatedPass.newpass
            Axios.put(`http://localhost:3003/admin/1`,{
                ...adminData,pass:newPass
            })
            setTimeout(() => {
                loadData()
                setChpass(false)
                toast.success("Password Updated Sucessfully")
            },500)
        }
        else{
            toast.error("Enter correct Password")
        }
    }
    return(
        <div className="admin-profile">
            <Toaster position="top-center"/>
            {editMode && <div className="edit-main-container">
                <div className="edit-container">
                    <h2>Edit Details</h2>
                    <div className="edit-form-container">
                        <div className="edit-2form">
                            <div>
                                <p>FirstName</p>
                                <input value={editedData.firstname} onChange={(e) =>{
                                    seteditedData({...editedData,firstname:e.target.value})
                                } }/>
                            </div>
                            
                            <div>
                                <p>LastName</p>
                                <input value={editedData.lastname} onChange={(e) =>{
                                    seteditedData({...editedData,lastname:e.target.value})
                                } }/>
                            </div>
                            
                        </div>
                        <div className="edit-2form">
                            <div>
                                <p>Age</p>
                                <input value={editedData.age} onChange={(e) =>{
                                    seteditedData({...editedData,age:e.target.value})
                                } }/>
                            </div>
                            
                            <div>
                                <p>Email</p>
                                <input value={editedData.mail} onChange={(e) =>{
                                    seteditedData({...editedData,mail:e.target.value})
                                } }/>
                            </div>
                            
                        </div>
                        <div className="edit-2form">
                            <div>
                                <p>Role</p>
                                <input value={editedData.role} onChange={(e) =>{
                                    seteditedData({...editedData,role:e.target.value})
                                } }/>
                            </div>
                            
                            <div>
                                <p>Phone</p>
                                <input value={editedData.phone} onChange={(e) =>{
                                    seteditedData({...editedData,phone:e.target.value})
                                } }/>
                            </div>
                            
                        </div>
                        <p>Address</p>
                        <input value={editedData.address} onChange={(e) =>{
                                    seteditedData({...editedData,address:e.target.value})
                                } }/>
                    </div>
                    <div className="edit-button-container">
                        <button className="admin-update-button" onClick={handleSubmit}>Update</button>
                        <button onClick={closeEdit} className="admin-edit-close">Close</button>
                    </div>
                </div>
            </div>}
            {chpass && <div className="chpass-main-container">
                <div className="chpass-container">
                    <h2>Update Password</h2>
                    <p>Current Password</p>
                    <input value={updatedPass.currentpass} onChange={(e) =>{
                                    setupdatedPass({...updatedPass,currentpass:e.target.value})
                                } }/>
                    <p>New Password</p>
                    <input value={updatedPass.newpass} onChange={(e) =>{
                                    setupdatedPass({...updatedPass,newpass:e.target.value})
                                } }/>
                    <div className="edit-button-container">
                        <button className="admin-update-button" onClick={handlePass}>Update</button>
                        <button onClick={closePass} className="admin-edit-close">Close</button>
                    </div>
                </div>
            </div> }
           <div className="admin-main">
                <div className="image-name">
                    <img className="admin-logo" src={logo}/>
                    <h1><span className="wel">Welcome,</span></h1>
                </div>
                <hr></hr>
                <div className="personel-details">
                     <h3><span>FirstName</span> : {adminData.firstname}</h3>
                     <h3><span>LastName </span> : {adminData.lastname}</h3>
                     <h3><span>Age</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {adminData.age}</h3>
                     <h3><span>Email</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {adminData.mail}</h3>
                     <h3><span>Phone</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {adminData.phone}</h3>
                     <h3><span>Address</span>&nbsp;&nbsp;&nbsp;&nbsp; : {adminData.address}</h3>
                </div>
                <div className="button-container">
                    <button className="admin-edit" onClick={openEdit}>Edit Details</button>
                    <button className="admin-edit" onClick={openPass}>Change Password</button>
                </div>
           </div>
           
        </div>
    )
}