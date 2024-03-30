//real url for cart
//localhost:8888/ecomm/api/v1/cart

const cartController = require("../controllers/cart.controller");
const authMw = require("../middlewares/auth.mw");

module.exports = (app) => {
    app.post("/ecomm/api/v1/cart", [authMw.verifyToken], cartController.createCart);

    app.delete("/ecomm/api/v1/cart/:userId", [authMw.verifyToken, authMw.isAdmin], cartController.deleteCart);

    app.get("/ecomm/api/v1/cart/:userId", cartController.getCartById);

    app.put("/ecomm/api/v1/cart/:userId", [authMw.verifyToken, authMw.isAdmin], cartController.updateCart);
};
