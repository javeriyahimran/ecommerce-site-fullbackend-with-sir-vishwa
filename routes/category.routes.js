// //POST: localhost:8888/ecomm/api/v1/categories (ya category create krny k liye URI h.)
// const category_controller=require("../controllers/category.controller")
// const authMw = require("../middlewares/auth.mw")
// //const authMw = require("../middlewares/auth.mw")
// auth_mw=require("../middlewares/auth.mw")

// module.exports=(app)=>{
//     app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken,authMw.isAdmin],category_controller.createNewCategory)
// }







const category_controller = require("../controllers/category.controller");
const authMw = require("../middlewares/auth.mw");

module.exports = (app) => {
    // Create New Category
    app.post("/ecomm/api/v1/categories", [authMw.verifyToken, authMw.isAdmin], category_controller.createNewCategory);

    // Delete Category
    app.delete("/ecomm/api/v1/categories/:categoryId", [authMw.verifyToken, authMw.isAdmin], category_controller.deleteCategory);

    // Edit Category
    app.put("/ecomm/api/v1/categories/:categoryId", [authMw.verifyToken, authMw.isAdmin], category_controller.editCategory);

    // Retrieve (Get) Category
    app.get("/ecomm/api/v1/categories/:categoryId", category_controller.getCategory);

    // Retrieve All Categories
    app.get("/ecomm/api/v1/categories", category_controller.getAllCategories);
};
