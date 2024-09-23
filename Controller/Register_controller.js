const Register = require('../Model/Signup_model')
const bcrypt  = require("bcrypt")
const Register_controller = async (req,res)=>{
try{
const useremail = await Register.findOne({email:req.body.email})
console.log(useremail)
if(useremail != null){

    res.json({"message":"user Aleardy exist",success:false})
}
else{
bcrypt.hash(req.body.password,10,async(err,hash)=>{
if(err){
    console.log(err)
}
else{
    const created_at = new Date()
    req.body.password = hash
    const{username,email, password} = req.body;
    const usercreate =  await Register({username,email, password,created_at})
    const result =  await  usercreate.save()
    res.json({"message":"Welcome",success:true})

   }
})
}
}
catch(error){
    console.log(error)
}

}
module.exports = Register_controller