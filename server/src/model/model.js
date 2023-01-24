const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema({
    Title : String,
    Description:String,
    status:{ 
        type:String,
        enum:["Open","In-Progress", "Completed"],
        require:true
    }

},{timestamps:true})
module.exports = mongoose.model("TODO",TodoSchema)
