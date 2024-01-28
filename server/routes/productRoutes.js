const express = require("express");
const { getProduct, addProduct, deleteProduct, getProductById,updateProductById } = require("../controllers/productController");
const authCheck = require("../middlewares/auth");
const roleGuard = require("../middlewares/roleGuard");
const upload = require("../middlewares/upload");
const router = express.Router();


router.get("/",
// authCheck,roleGuard(["selling","admin"]),
getProduct);

router.post("/",
authCheck,
//roleGuard('seller'),
upload.single("image"),addProduct);

router.get("/:productId", getProductById);

router.put("/:productId", upload.single("image"), updateProductById);

router.delete("/:productId",
// authCheck,roleGuard("seller"),
deleteProduct);


module.exports= router;