const express = require("express");
const App = express();
require("dotenv").config();
const userroute = require("./routes/userroute");
const mongoose = require("mongoose");
const authroute = require("./routes/authroute");

App.use(express.json());

App.get("/",(req,res)=>{
    res.send("port is connected");
})

App.use("/users",userroute);
App.use("/auth",authroute);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    App.listen(process.env.PORT,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(`DB is connected Your server is listning on port http://localhost:${process.env.PORT}`);
        }
    })
}).catch((err)=>{
    console.log(err);
})