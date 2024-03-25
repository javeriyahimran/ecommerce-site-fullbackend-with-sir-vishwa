//is category mai bs name or description hoga.

const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    } 
},{timestamps:true,versionKey:false})

const Category=mongoose.model("Category",categorySchema)
module.exports=Category


//ya jo main nay 2 line mai kiya h ya aisy b hoskta h
//module.exports=mongoose.model=("Category",categorySchema)