const express = require("express");
const { userCart, addCartProduct,removeItemFromCart,updateCartItem } = require("../controllers/cartController");
const router = express.Router();

router.get("/user/:userId",userCart);

router.post("/user/:userId",addCartProduct);

// remove item from cart
router.delete(
  "/remove/:userId/:productId",
  // authCheck,
  removeItemFromCart
);

// update quantity in cart
router.patch("/remove/:userId/:productId", updateCartItem);

module.exports=router;