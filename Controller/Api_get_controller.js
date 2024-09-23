const Apiget = require('../Model/Signup_model')
const blogapi = require('../Model/Add_Blog')
const categories = require('../Model/Category')
const Register = require('../Model/Signup_model')
const slugify = require('slugify')
const Blog = require('../Model/Add_Blog')
const bcrypt = require('bcryptjs')
const Api_get_controller =async (req,res)=>{
const apidata = await Apiget.find()
console.log(apidata)
res.json({"apidata":apidata, "apikey":process.env.Api_key})
}
const Blog_api_controller = async (req, res) => {
    
      // Fetch all blog data
      try {
        
        // Check if the request body is empty
        if(req.method === "GET"){
        if (!req.body || Object.keys(req.body).length != 0) {
          throw new Error('Invalid action!');
        
        }
        
      const blogapis = await blogapi.find();
  
      // Extract category IDs from the fetched blog data
      const categoryIds = blogapis.map((blog) => blog.category);
  // console.log(categoryIds)
      // Fetch categories based on the extracted category IDs
      const categoriesData = await categories.find({ _id: { $in: categoryIds } });
  // console.log(categoriesData)
      // Combine the blog data with corresponding category information
      const result = blogapis.map((blog) => {
        const blogWithCategory = { ...blog.toObject(), category: categoriesData.find((category) => category._id.equals(blog.category)) };
        // console.log(blogWithCategory)
        return blogWithCategory;
      });
  
      res.json({ blog: result ,"apikey":process.env.Api_key});
    }
    else{
      if (!req.body || Object.keys(req.body).length != 0) {
        throw new Error('Invalid action!');
      
      }
      
      res.json({message:'Invalid action: POst request is not allowed for this endpoint!'});
    }
       
    } 
 
    catch (error) {
        console.error('Error fetching blog data:', error);
      
        // Handle the response here (depending on your server framework)
        res.status(500).json({ status: 0, data: [], msg: stripTagsCustom(error.message) });
      }
  };
  const Blog_post_api = async(req,res)=>{
    try{
      // console.log(req.body)
      const {title,tag,category,blogstatus,metadescription,metatitle,decsription,image} = req.body
      const slug = slugify(title, { lower: true })
      const created_at = new Date()
      const result = await Blog({title,tag,category, decsription:decsription ,slug,image,created_at,blogstatus,metatitle,metadescription})
      const blog = await result.save()
      // console.log(blog)
      res.json({"message":"Add Blog Successfully",success:true})
      }
      catch(error){
          console.log(error)
      }
  }
  const user_post_api_controller = async (req, res) => {
    try {
      console.log(req.body)
        // Check if the request method is POST
        if (req.method === "POST") {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error('Invalid action: Request body is empty!');
            }

            if (req.body.key !== process.env.key) {
                throw new Error('Invalid key!');
            }
// console.log(req.body)
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await Register.findOne({ email });
            if (existingUser) {
                return res.json({ message: "User already exists", success: false });
            }

            const created_at = new Date();
            const newUser = new Register({ username, email, password:hashedPassword , created_at });
            const result = await newUser.save();
            // console.log("New user created:", result);

            res.json({ message: "Welcome", success: true, userdata: result });
        } else {
            
            return res.json({ message: 'Invalid action: GET request is not allowed for this endpoint!', success: false });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(400).json({ message: error.message, success: false });
    }
}

const update_api_controller = async(req,res)=>{
  try{
    if(req.method == "PUT"){

    const {username,email,password} = req.body
    const updated_at = new Date()
    const categorydelete = await Register.findByIdAndUpdate({_id:req.params.uid},{username,email,password,updated_at})
    // console.log(categorydelete)
    res.json({"message":"Category Succefull Update",sucess:true})
    }
    else{
      res.json({"message":"Invalid Action"})
    }
  }
    catch(error){
        console.log(error)
    }
}
const patch_api_controller = async(req,res)=>{
  try{
    if(req.method == "PATCH"){
  const userdata = req.body
  // console.log(userdata)
  const updated_at = new Date()
  const categorydelete = await Register.findOneAndUpdate({_id:req.params.pid},{userdata})
  // console.log(categorydelete)
  res.json({"message":"user Succefull Update",sucess:true})
  }
  else{
    res.json({"message":"Invalid Action"})
  }
}
  catch(error){
      console.log(error)
  }
}


module.exports = {Api_get_controller,Blog_api_controller,user_post_api_controller,update_api_controller,patch_api_controller,Blog_post_api}