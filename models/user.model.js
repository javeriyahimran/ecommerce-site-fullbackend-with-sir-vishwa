const mongoose =require("mongoose")

//schema mai hmen ya sb rkhna h
// username password userId usertype email

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        minLength:10,
        lowercase:true,
        unique:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
userType:{
    type:String,
    required:true,
    default:"CUSTOMER",
    enum:["CUSTOMER","ADMIN"] //enum yani koi fixed value jese weekdays mai koi fixed day hota h like sunday
    },
   },{timestamps:true,versionKey:false})

   const User=mongoose.model("user",UserSchema) //yha mai ny user collection ka nam rkha h lekin ya isko plural lega yani users lega.
   module.exports=User