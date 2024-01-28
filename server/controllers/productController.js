const ProductModel = require("../models/productModel");

const getProduct = async(req,res)=>{
  try{
    const products = await ProductModel.find();
    res.status(200).json(products);
    //res.send("Hello")
  }catch(error){
    res.status(404).send("Internet server error")
  }
};

const addProduct = async(req,res)=>{
  try{
    //console.log("check image",req.file);
    console.log(req.body);
    let data = JSON.parse(req.body.data)
    console.log("check",req.body.data); 
    console.log(data)
    
    let newProductObj = {...data, imageUrl: req.file.filename};
    const newProducts = await ProductModel.create(newProductObj);
    res.json(newProducts);
  }catch(error){
    console.log(error)
    res.status(404).send(error.message)
  }
};
//get product by id
const getProductById = async(req,res)=>{
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
//update a product

//update an id by product
const updateProductById = async (req, res) => {
  try {
    console.log("data>>>", req.body);
    let origianlData = JSON.parse(req.body.data);
    let newData;
    if (req.file) {
      newData = { ...origianlData, imageUrl: req.file.filename };
    } else {
      newData = { ...origianlData };
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.productId,
      newData,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//delete a product
const deleteProduct = async(req,res)=>{
  try {
    const productId = req.params.productId;
    let product = await ProductModel.findByIdAndDelete(productId)
    if(!product){
      res.json({Error:"Please provide correct ID"})
      return;
    }
    res.json(product)
  }catch (error) {
     console.log("Error",error);
     res.status(404).send("Internal server error");
  }
  
}

module.exports={getProduct,addProduct,deleteProduct,getProductById,updateProductById};