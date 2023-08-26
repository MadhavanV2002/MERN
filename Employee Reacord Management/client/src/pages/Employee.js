import React from "react";
import Axios  from "axios";
import logo from '../images/admin.png'
import toaster, { Toaster } from 'react-hot-toast'
export default function Employee(){
    const [userData,setuserData] = React.useState([])
    const [viewEmployee,setviewEmployee] = React.useState(false)
    const [viewData,setViewData] = React.useState({})
    const [addNew,setaddNew] = React.useState(false)
    const [newData,setnewData] = React.useState({})
    const [openEdit,setOpenEdit] = React.useState(false)
    const [EditedData,setEditedData] = React.useState({})
    async function loadData(){
        const Data = await Axios.get(`http://localhost:3003/users`)
        const d=Data.data
        setuserData(d)
        console.log(userData)
    }
    function handleView(id){
        var index
        console.log("Hello")
        for(let i=0;i<userData.length;i++){
            if(userData[i].id===id){
                index=i
                break
            }
        }
        setViewData(userData[index])
        setviewEmployee(true)
    }
    async function handleDelete(id){
        Axios.delete(`http://localhost:3003/users/${id}`)
        toaster.success("Removed Successfully")
        setTimeout(() => {
            loadData()
        },500)
    }
    function handleaddNew(){
        setaddNew(true)
    }
    function addNewSubmit(){
        console.log(newData)
        Axios.post('http://localhost:3003/users',{
            ...newData
        }).then(()=> {
            setnewData({})
        }).catch((err) => {
            console.log(err)
        })
        setTimeout(() => {
            toaster.success("Added Successfully")
            setaddNew(false)
            loadData()
        }, 500);
    }
    function OPENEDIT(id){
        var index
        console.log("Hello")
        for(let i=0;i<userData.length;i++){
            if(userData[i].id===id){
                index=i
                break
            }
        }
        setEditedData(userData[index])
        setOpenEdit(true)
    }
    function CLOSEEDIT(){
        setOpenEdit(false)
    }
    function handleEditSubmit(){
        var index
        console.log("Hello")
        for(let i=0;i<userData.length;i++){
            if(userData[i].id===EditedData.id){
                index=i
                break
            }
        }
        const PASS = userData[index].pass
        const ID = userData[index].id
        Axios.put(`http://localhost:3003/users/${EditedData.id}`,{
            ...EditedData,id:ID,pass:PASS
        })
        setTimeout(() => {
            toaster.success("Details Updated Successfully")
            setOpenEdit(false)
            loadData()
        }, 500);
    }
    React.useEffect(()=>{
        loadData()
    },[])
    const UserData = userData.map((DATA) => <div className="user-data-div">
            <p className="data-width">{DATA.firstname+" "+DATA.lastname}</p>
            <p className="data-width">{DATA.employementtype}</p>
            <p className="data-width">{DATA.job}</p>
            <p className="data-width">{DATA.department}</p>
            <p className="data-width">{DATA.current}</p>
            <button className="view-button" onClick={() => handleView(DATA.id)}>View</button>
            <button className="edit-button" onClick={() => OPENEDIT(DATA.id)}>Edit</button>
            <button className="del-button" onClick={() => handleDelete(DATA.id)}>Remove</button>
        </div>
    )
    function closeEmp(){
        setviewEmployee(false)
    }
    function closeNEW(){
        setaddNew(false)
    }
    return(
        <div className="employee">
            <Toaster position="top-center" />
            {viewEmployee && <div className="view-employee-main">
                <div className="view-emp-container">
                    <div>
                        <img className="emp-photo" src={logo}/>
                    </div>
                    <div>
                        <p>FullName : {viewData.firstname+" "+viewData.lastname}</p>
                        <p>Age : {viewData.age}</p>
                        <p>Phone : {viewData.phone}</p>
                        <p>Email : {viewData.mail}</p>
                        <p>Job Title : {viewData.job}</p>
                        <p>Employement Type : {viewData.employementtype}</p>
                        <p>Current Project : {viewData.current}</p>
                        <p>Address : {viewData.address}</p>
                        <div className="close-emp-button-container">
                            <button className="emp-close" onClick={closeEmp}>Close</button>
                        </div>
                    </div>
                </div>
            </div> }
            {addNew && <div className="addnew-employee-main">
                <div className="addnew-container">
                    <h2>Add New Employee</h2>
                    <div>
                        <div className="form2">
                            <div>
                                <p>ID</p>
                                <input value={newData.id} onChange={(e) => setnewData({...newData,id:e.target.value})}/>
                            </div>
                            <div>
                                <p>Password</p>
                                <input value={newData.pass} onChange={(e) => setnewData({...newData,pass:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>FirstName</p>
                                <input value={newData.firstname} onChange={(e) => setnewData({...newData,firstname:e.target.value})}/>
                            </div>
                            <div>
                                <p>LastName</p>
                                <input value={newData.lastname} onChange={(e) => setnewData({...newData,lastname:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Mail</p>
                                <input value={newData.mail} onChange={(e) => setnewData({...newData,mail:e.target.value})}/>
                            </div>
                            <div>
                                <p>Age</p>
                                <input value={newData.age} onChange={(e) => setnewData({...newData,age:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Job Title</p>
                                <input value={newData.job} onChange={(e) => setnewData({...newData,job:e.target.value})}/>
                            </div>
                            <div>
                                <p>Department</p>
                                <input value={newData.department} onChange={(e) => setnewData({...newData,department:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Employement Type</p>
                                <input value={newData.employementtype} onChange={(e) => setnewData({...newData,employementtype:e.target.value})}/>
                            </div>
                            <div>
                                <p>Address</p>
                                <input value={newData.address} onChange={(e) => setnewData({...newData,address:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Current Project</p>
                                <input value={newData.current} onChange={(e) => setnewData({...newData,current:e.target.value})}/>
                            </div>
                            <div>
                                <p>Phone</p>
                                <input value={newData.phone} onChange={(e) => setnewData({...newData,phone:e.target.value})}/>
                            </div>
                        </div>
                    </div>
                    <div className="addnew-button-container">
                        <button className="add-employee-button" onClick={addNewSubmit}>Add Employee</button>
                        <button className="close-newemp-button" onClick={closeNEW}>Close</button>
                    </div>
                </div>
            </div> }
            { openEdit && <div className="addnew-employee-main">
                <div className="addnew-container">
                    <h2>Edit Details</h2>
                    <div>
                        <div className="form2">
                            <div>
                                <p>FirstName</p>
                                <input value={EditedData.firstname} onChange={(e) => setEditedData({...EditedData,firstname:e.target.value})}/>
                            </div>
                            <div>
                                <p>LastName</p>
                                <input value={EditedData.lastname} onChange={(e) => setEditedData({...EditedData,lastname:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Mail</p>
                                <input value={EditedData.mail} onChange={(e) => setEditedData({...EditedData,mail:e.target.value})}/>
                            </div>
                            <div>
                                <p>Age</p>
                                <input value={EditedData.age} onChange={(e) => setEditedData({...EditedData,age:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Job Title</p>
                                <input value={EditedData.job} onChange={(e) => setEditedData({...EditedData,job:e.target.value})}/>
                            </div>
                            <div>
                                <p>Department</p>
                                <input value={EditedData.department} onChange={(e) => setEditedData({...EditedData,department:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Employement Type</p>
                                <input value={EditedData.employementtype} onChange={(e) => setEditedData({...EditedData,employementtype:e.target.value})}/>
                            </div>
                            <div>
                                <p>Address</p>
                                <input value={EditedData.address} onChange={(e) => setEditedData({...EditedData,address:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form2">
                            <div>
                                <p>Current Project</p>
                                <input value={EditedData.current} onChange={(e) => setEditedData({...EditedData,current:e.target.value})}/>
                            </div>
                            <div>
                                <p>Phone</p>
                                <input value={EditedData.phone} onChange={(e) => setEditedData({...EditedData,phone:e.target.value})}/>
                            </div>
                        </div>
                    </div>
                    <div className="addnew-button-container">
                        <button className="add-employee-button" onClick={handleEditSubmit}>Update</button>
                        <button onClick={CLOSEEDIT} className="close-newemp-button">Close</button>
                    </div>
                </div>
            </div>}
            <div className="employee-main">
                <div className="emp-title">
                    <div>
                        <h2 className="people">People Directory</h2>
                        <p className="greet">A wonderful serenity has taken possesion of my entire soul, like these sweet mornings</p>
                    </div>
                    <button className="add-new" onClick={handleaddNew}>Add new Employee</button>
                </div>
                <div className="employee-title">
                    <h3 className="data-width">FullName</h3>
                    <h3 className="data-width">Employement Type</h3>
                    <h3 className="data-width">Job Title</h3>
                    <h3 className="data-width">Department</h3>
                    <h3 className="data-width">Current Project</h3>
                </div>
                <div className="user-data-div2">
                    {UserData}
                </div>
            </div>
        </div>
    )
}