const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../config/auth.config")

exports.signup=async(req,res)=>{
    //logic to create the user


    //1 read the request body
    const request_body=req.body //ya hmen js obj ki form mai req body deta h.


    //2 insert the data in the users collection in mongoDB

    const user_obj={
        name:request_body.name,
        email:request_body.email,
        userId:request_body.userId,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)

    }

    try{
        const user_created=await user_model.create(user_obj)//ab hme user return krna h yani reponse dena h tou ya hoga

        const req_obj={
            name:user_created.name,
            email:user_created.email,
            userId:user_created.userId,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }

        res.status(201).send(req_obj) //201 jb hota h jb successfully create hojye kuch. ya km hojye tb k liye.

    }catch(error){
console.log("error while registering user",error)
res.status(500).send({  //500 internal server error hota h.
    message:"some error while registering the user."
})
    }

    //3 return the response back to the user.
}


//for signin method

exports.signin=async(req,res)=>{

    //check if the userid is present or not
const user=await user_model.findOne({userId:req.body.userId})
if(user==null){
   return res.status(400).send({
        message:"user id passed is not valid"
    })
}


//password is correct
const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
if(!isPasswordValid){
    return res.status(401).send({
        message:"wrong password passed"
    })
}
//using jwt we will create access token with a given ttl(time to live) and return
const token=jwt.sign({id:user.userId},secret.secret,{
    expiresIn:120 //yani ya 2min mai expire hojega.
})

res.status(201).send({
    name:user.name,
    email:user.email,
    userId:user.userId,
    userType:user.userType,
    accessToken:token
})
//token banany k liye phla part hota h k kis data se apny token banan h like mai ny yha userid se bnya h
//dusra part hota h aik secret key ya code or last part expiry time.

}