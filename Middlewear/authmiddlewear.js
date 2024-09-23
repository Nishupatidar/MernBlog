const jwt = require('jsonwebtoken')
const authmiddlewear = (req,res,next)=>{

try{
//     const token1 = req.headers;
// console.log(token1)
const token = req.headers['authorization'].split(" ")[1];
    //  console.log(token)
    jwt.verify(token,process.env.SECRATE_KEY, (error, decode)=>{
        if(error){
            res.json({"message":"Invaild Userssss",success:false})
        }
        else{
            // console.log(decode)
            // console.log(decode)
        req.body = decode
        next();
    }
   })
}
catch(error){
    // res.json({message: "Invalid user", success: false});   
}

}
module.exports = {authmiddlewear}