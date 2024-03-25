const auth_controller=require("../controllers/auth.controller")
const authMW=require("../middlewares/auth.mw")

//routes intercept krty h request ko.

//POST: localhost:8888/ecomm/api/v1/auth/signup (ya post k liye URI h)

//pora app aik playes h like app routes ko control dedeta h routes controllers ko controllers phr models ko dedety h

module.exports=(app)=>{  //yha hmny pora app pss krdya h
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifiedSignup], auth_controller.signup);//ya hmny middleware ko use kya jo hmny bnya tha na verifiedsignup ka usy

    //POST: localhost:8888/ecomm/api/v1/auth/signin (ya post k liye URI h)

app.post("/ecomm/api/v1/auth/signin",[authMW.verifiedSignin],auth_controller.signin)
}