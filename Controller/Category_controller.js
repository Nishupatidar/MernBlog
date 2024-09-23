const user = require('../Model/Signup_model')
const category = require('../Model/Category')
const Blog = require('../Model/Add_Blog')
const Comment = require('../Model/Comment_Blog')
const Reply = require('../Model/Reply_Blog')
const Category_controller = async(req,res)=>{
    try{
const {category_name,description} = req.body
const cetegories = await category.findOne({category_name})
if(cetegories==null){
const created_at = new Date()
const categorysave = await category({category_name,description,created_at,
        Userid:user._id})
   const result = await categorysave.save()
    res.json({"message":"Category Successfully Add" ,success:true})
}
else{
    res.json({"message":"Category already exist",success:false})
}
    }
    catch(error){
        console.log(error)
    }
}
const Category_show_controller =async (req,res)=>{
    try{
    const categoies = await category.find({})
   res.json({"Categories":categoies,success:true})
    }
    catch(error){
        console.log(error)
    }
}
const Delete_category_controller = async(req,res)=>{
    try{
    const categorydelete = await category.findByIdAndDelete({_id:req.params.cdid})
    const Post = await Blog.deleteMany({category:req.params.cdid})
    console.log(Post)
    res.json({"message":"Category Succefull Delete",success:true})
    }
    catch(error){
        console.log(error)
    }
}

const Edit_category_controller = async(req,res)=>{
   try{
    const creditedits = await category.findById({_id:req.params.ceid})
    console.log(creditedits)
    res.json({"useredit":creditedits})
   }
   catch(error){
    console.log(error)
   }
}
const Update_category_controller = async(req,res)=>{
    try{

        const{category_name,description} = req.body
        const updated_at = new Date()
        const updatestatus = await category.findByIdAndUpdate({_id:req.body._id},{category_name,description,updated_at})
        res.json({"message":"Successfully Update","success":true})
    }
    catch(error){
        console.log(error)
    }
    }
const Update_category_status_controller = async(req,res)=>{
    try{

        const updatestatus = await category.findByIdAndUpdate({_id:req.params.ucid},{status:req.body.status})
    }
    catch(error){
        console.log(error)
    }
    
}
const all_category_controller =async (req,res)=>{
   try{
const category = await Blog.find({category:req.params.cid})
res.json({"allcategory":category,"success":true})
   }
   catch(error){
    console.log(error)
   }
}
module.exports = {Category_controller,Category_show_controller,Delete_category_controller,Edit_category_controller,Update_category_controller,Update_category_status_controller,all_category_controller}