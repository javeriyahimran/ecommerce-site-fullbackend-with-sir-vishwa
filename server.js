const express=require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./config/server.config")
const db_config=require("./config/db.config")
const user_model=require("./models/user.model")
const bcrypt=require("bcryptjs")

app.use(express.json(app)) //ya midleware h. ya line help krti h k apny jo json obj pss kya h usy js-obj kre. 
//middlewares in between hoty h jo additionally hoty jo enhance krty h features ko.
//middlewares js mai functions hoty h is ami 3 chezn hoti h req,res,next next yani agy bhjny k liye like controllers
//ny models ki bhjna h tou next k zariye bhjega. 


//ab hm admin user create krege agr woh ni hoga tou.
//yha hm mongo ka url b config folder mai rkhege.

mongoose.connect(db_config.DB_URL)

const db= mongoose.connection //iska mtlb h k hm mongoose se connect krwarhy h

//ab hmrey pas do ooptions hongy yani 2 kism k respinse honge ya tou connect k time error ya phr successfully connect

db.once("open",()=>{
    console.log("succesfully connected to DB")
    })

    init()

  db.on("error",()=>{
    console.log("error while conneting to DB")
})


async function init(){
let user=await user_model.findOne({userId:"admin"})

if(user){
    console.log("Admin is already present")
    return
}

try{
    user=await user_model.create({
        name:"Javeriyah",
        email:"javeriyah@gmail.com",
        password:bcrypt.hashSync("javeriyah2003",8), //ab yha password ko hash krege bcrypt k through iska mtlb k password 8 letters mai hash hoga.
        userId:"admin",
        userType:"ADMIN"
    })
    console.log("admin created")

}catch(error){
    console.log("error while creating user",error)
}
}


//stich the route to the server

require("./routes/auth.routes")(app) //ya hmny route ko app ko dya h.call routes and passing app object.
require("./routes/category.routes")(app)
require("./routes/cart.routes")(app)
 //ya hmny route ko app ko dya h.call routes and passing app object.
app.listen(server_config.PORT,()=>{
    console.log("server is started at Port:",server_config)
})

//ports customize hoty h yani changeable tou unko hm is trh config mai rkhty h
