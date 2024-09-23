const userregister = require("../Model/Signup_model")
const login = require('../Model/Admin_login')
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const Login_controller =async (req,res)=>{
  console.log(req.body)
  try{
const loginuser = await login.findOne({email:req.body.email})
// console.log(loginuser)
if(loginuser!=null){
    let userpassword = await bcrypt.compare(req.body.password,loginuser.password)
  if(userpassword == true){
    jwt.sign({userAuthData: loginuser}, process.env.SECRATE_KEY, {expiresIn: '10s'}, (err, token)=>{
      // console.log(token)
      res.send({ "message":"Login Successfull","success":true, token: token})
   })

  }  
  else{
    res.json({"message":"Password are not Match",success:false})
  }
}
else{
    res.json({"message":"email are not match",success:null})
}
  }
  catch(error){
    console.log(error)
  }

}
module.exports = Login_controller