const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
app.use(cookieParser())
app.use(cors(
    {
        origin:'http://localhost:3000',
        methods:["POST","GET","DELETE","PATCH"],
        credentials:true
    }
))
app.use(express.json())
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("DB Connected")
})
const userSchema = {
    name : String,
    email: String,
    password : String,
    todolist : Array
}
const User = mongoose.model('users',userSchema)
const middleware = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
       return res.send("Error")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,email) => {
        if(err){
           return res.send("Error")
        }
        req.email = email
        next()
    })
}
app.get('/',middleware,(req,res) => {
    res.send({
        status : "Ok"
    })
})
app.post('/register',(req,res) => {
    const email = User.find({
        email:req.body.email
    }).then((data) => {

        if(data.length === 0)
        {
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                todolist : []
            })
            newUser.save().then((success) => {
                res.send("New user Added Succesfully")
            })
        }
        else{
            res.send("Email Already Registered")
        }
    })
})
app.post('/login',(req,res) => {
    const email = User.find({
        email:req.body.email
    }).then((data) => {
        if(data.length > 0){
            if(req.body.password === data[0].password){
                const token = jwt.sign(data[0].email,process.env.ACCESS_TOKEN_SECRET)
                res.cookie('token',token)
                res.send("Login Successfull")
            }
            else{
                res.send("password Does Not Match")
            }
        }
        else{
            res.send("Email Not Found Please Register then Login")
        }
    })
})
app.get('/allTasks',middleware,(req,res) => {
    const email = req.email
    User.find({
        email:email
    },'todolist').then((data) => {
        res.send(data[0].todolist)
    })
})
app.post('/addTask',middleware,(req,res) => {
    const newTask = {
        id : req.body.id,
        Title:req.body.title,
        Description :req.body.description,
        completed : false
    }
    const email = req.email
    User.updateOne({
        email:email
    },{
        $push: {
            todolist: newTask
        }
    }).then((data) => {
        res.send("OK")
    })
})
app.delete('/deleteTask',middleware,(req,res) => {
    const email = req.email
    User.updateOne({
        email:email
    },{
        $pull: {
            todolist: {
                id:req.body.id
            }
        }
    }).then((data) => {
        res.send("OK")
    })
})
app.patch('/updateTask',middleware,(req,res) => {
    const email = req.email
    User.updateOne(
        { email: email, "todolist.id": req.body.id },
        { $set: { "todolist.$.completed": true } }
      ).then((data) => {
        res.send("OK")
    })
})
app.post('/changePassword',middleware,(req,res) => {
    const email = req.email
    User.find({
        email:email
    },'password').then((data) => {
        if(data[0].password === req.body.oldpassword){
            User.updateOne({
                email:email
            },{
                password:req.body.newpassword
            }).then((data) => {
                res.send("Ok")
            })
        }
        else{
            res.send("Password Does not Match")
        }
    })
    
})
app.get('/logout',(req,res) => {
    
    res.clearCookie('token')
    res.send("Ok")  
})
app.listen(process.env.PORT, () => {
    console.log("server Running")
})