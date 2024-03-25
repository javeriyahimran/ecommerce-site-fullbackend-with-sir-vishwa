//POST: localhost:8888/ecomm/api/v1/categories (ya category create krny k liye URI h.)
const category_controller=require("../controllers/category.controller")
//const authMw = require("../middlewares/auth.mw")
auth_mw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken],category_controller.createNewCategory)
}






