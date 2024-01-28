const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUser = async(req,res)=>{
  try {
    let usersData = await UserModel.find();
    res.send(usersData);
  } catch (error) {
    res.send(error.message);
  }
};
const addUser = async (req,res)=>{
  try{
    const userData = req.body;
    const saltRounds = 10
    let hashedPassword= await bcrypt.hash(userData.password,saltRounds);
    let newUser=new UserModel({
    // email:userData.email,
    // password:userData.password,
    // username:userData.username,
    // role:userData.role
    ...userData,
    password:hashedPassword
    });

    await newUser.save();
    console.log(userData);

    let messageData ={
      message: "user added successfully",
      status : 200,
      data: newUser,
    };
    res.status(200).send(messageData);
  }catch(error){
    let messageData ={
      message: error.message,
      status : 404,
      data: error,
    };
  res.status(404).send(messageData);
}
}
const loginUser = async(req,res)=>{
  try{
    let userLoginData = req.body
    let userData = await UserModel.findOne({email:userLoginData.email})

    if(userData){
      let isPasswordCorrect = await bcrypt.compare(
        userLoginData.password,
        userData.password,
        );
        
      if(isPasswordCorrect){
        let token = jwt.sign(
          {
            _id:userData._id,
            role:userData.role,
          },
          "secret",
          { expiresIn: 60 * 60 }
          );

          let messageData = {
            message: "User Logged in successfully",
            status: 200,
            data: { token },
          };
          res.status(200).send(messageData);

      }else{
        res.status(201).json({message:"Invalid Credentials"});
      }
    }else{
      res.status(201).json({message: "User does not exist"});
    }
  }catch(error){
    let messageData = {
      message: error.message,
      status: 404,
      data: error,
  };
  res.status(404).send(messageData);
}
};
const updateUser= async(req,res)=>{
  try{
    console.log("Req" , req.userId);
    let userId = req.params.userId;
    let enteredData = req.body;
    console.log(userId);
    let updateUser = await UserModel.findByIdAndUpdate(userId,enteredData,{
      new:true,
    });
    res.send(updateUser);
  }catch(error){
    let messageData = {
      message: error.message,
      status: 404,
      data: error,
  };
  res.status(404).send(messageData);
  }
}
module.exports= {getAllUser,addUser,loginUser,updateUser}; 
