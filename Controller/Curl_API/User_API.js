const axios = require("axios")
const Register = require("../../Model/Signup_model")
const User_API = async(req,res)=>{
    API_KEY = process.env.Api_key
    
    try{
      if (req.method === "POST") {
        // if (!req.body || Object.keys(req.body).length === 0) {
        //     throw new Error('Invalid action: Request body is empty!');
        // }
        console.log(req.body)
    console.log(req.body.api_key
      )
        if (req.body.api_key === API_KEY) {
            // throw new Error('Invalid key!')
        
    
        const { username, email, password } = req.body;
        
    
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists", success: false });
        }
    
        const created_at = new Date();
        const newUser = new Register({ username, email, password, created_at });
        const result = await newUser.save();
        // console.log("New user created:", result);
    
        res.json({ message: "Welcome", success: true, userdata: result });
      }
      else{
        res.json({ message: 'APi key is not match', success: false })
      }
    } else {
        
        return res.json({ message: 'Invalid action: GET request is not allowed for this endpoint!', success: false });
    }
    }
    catch(error){
      console.log(error)
    }
    }
    module.exports = User_API