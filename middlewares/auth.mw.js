//create a middleware which will check request body is proper and correct.

const user_model = require("../models/user.model");
const jwt=require("jsonwebtoken")
const auth_config=require("../config/auth.config")
const verifiedSignup = async (req, res, next) => {
  try {
    //check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: "failed! you wasn't provide the name in the request body",
      });
    }
    //check for the email
    if (!req.body.email) {
      return res.status(400).send({
        message: "failed! you wasn't provide the email in the request body",
      });
    }
    //check for the userId
    if (!req.body.userId) {
      return res.status(400).send({
        message: "failed! userId was not provided in the request body",
      });
    }
    //check for the user with the same userId is already present
    const user = await user_model.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).send({
        message: "failed! user is already present with same userId",
      });
    }
    next();
  } catch (error) {
    console.log("error while validating", error);
    res.status(500).send({
      message: "error while validating the request body",
    });
  }
};

const verifiedSignin = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "user id is not provided",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "password id is not provided",
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  //check if the token is present in the header or not
  const token = req.headers["x-access-token"]; //ya x-access-token h yni ya postman mai headers ki jgh pr h
 
  if (!token) {
    return res.status(403).send({
      //402 yni bad request h
      message: "token not found :UnAuthorized",
    });
  }

  //token is valid or not
  jwt.verify(token.auth_config.secret,async(err,decoded)=>{
if(err){
    return res.status(401).send({
        message:"unAuthorized!"
    })
}
const user=await user_model.findOne({userId:decoded.id})
if(!user){
    return res.status(400).send({
        message:"unAuthorized! user for this token doesn't exist"
    })
}
next()
  })
 

  //then move to the next
};

module.exports = {
  verifiedSignup: verifiedSignup,
  verifiedSignin: verifiedSignin,
  verifyToken:verifyToken
};
