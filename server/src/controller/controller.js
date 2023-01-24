const TodoModel = require("../model/model")

module.exports.addTask = async (req,res)=>{
 try{
    let data = req.body
    let addData = await TodoModel.create(data)
    return res.status(201).send({status:true,message:"Your task added in list",data:addData})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

module.exports.getTask = async (req,res)=>{
    try{
        let addData = await TodoModel.find()
        return res.status(200).send({status:true,data:addData})
        }
        catch(err){
            res.status(500).send({status:false,message:err.message})
        }
}

module.exports.editTask = async (req,res)=>{
    try{
        let taskId = req.params.taskId
        let data = req.body
        let addData = await TodoModel.findByIdAndUpdate(taskId,data)
        return res.status(201).send({status:true,message:"Your task Updated in list",data:addData})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}


module.exports.deleteTask = async (req,res)=>{
    try{
        let taskId = req.params.taskId
        let data = req.body
        let addData = await TodoModel.findByIdAndDelete(taskId,data)
        return res.status(200).send({status:true,message:"Your task Deleled succesfully",data:addData})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}
