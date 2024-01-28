const mongoose = require("mongoose");
const {Schema} = mongoose;
const productSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  stock:{type: Number, required: true},
  imageUrl: {type: String},
  //original: {type:String},
  userId: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  category:{type:String,required:true},
  attributes: [{name:String,value:String}],
});
const ProductModel = mongoose.model("Product",productSchema);
module.exports=ProductModel;