const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const route = require("../src/route/route")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://vishal0102:vishal0102@cluster0.9uryho2.mongodb.net/todoApp",{
    useNewUrlparser:true
}).then(console.log("mongodb is connected"))
.catch((err)=>{
    console.log(err)
});

app.use(cors());
app.use("/",route);

app.listen(8000,()=>{
    console.log("server running on Posrt "+8000)
});