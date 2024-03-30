const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartId:{
    type:String,
    unique:true,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [

    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
      },

name:{
  type:String,
  required:true
},

description:{
  type:String,
  required:true
},
      price: {
        type:Number,
        default:1,
      },

      quantity:{
        type:Number,
        default:1,
        required:true
      },
    },
  ],

  totalPrice:{
type:Number,
required:true,
default:0
  }
},{timestamps:true,versionKey:false});

module.exports=mongoose.model("Cart",cartSchema)
