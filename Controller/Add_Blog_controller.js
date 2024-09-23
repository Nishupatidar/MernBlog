const Blog = require('../Model/Add_Blog')
const slugify = require('slugify')
const categories = require('../Model/Category')
const Comment = require('../Model/Comment_Blog')
const csv = require('fast-csv')
const fs = require('fs')
// const Blog = require('./models/Blog'); // Import your Blog model

const Add_Blog_controller = async (req, res) => {
    try {
        console.log(req.body)
        const { title, tag, category, blogstatus, metadescription, metatitle, decsription } = req.body;
       
        const slug = slugify(title, { lower: true });
        const created_at = new Date();
//  if(tag === blog.tag){
//     console.log("hello tag")
//  }

        const blog = new Blog({
            title,
            tag,
            category,
            decsription: decsription,
            slug,
            image:req.files.images[0].filename,
            created_at,
            blogstatus,
            metatitle,
            metadescription
        });

        // Save the blog to the database
        await blog.save();

        res.json({ "message": "Add Blog Successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error", success: false });
    }
};

module.exports = Add_Blog_controller;

const Blog_controller = async (req,res)=>{
    try{
        // const page = 1;
        // const pagesize = 3;
        // const skip = (page - 1) * pagesize
        // console.log(skip)
        const getBlog =  await Blog.find({}).populate("category").sort({ created_at: -1})
        // .skip(skip).limit(pagesize)
        // console.log(getBlog)
        const pipeline = [
            {$match:{category:"65e9bf5b00ca83f023db2fb6"}},
            {$group : {_id:"$category",count:{$sum:1}}}
          ]
          const aggcursor = Blog.aggregate(pipeline)
        //   console.log(aggcursor)
          for await (const doc of aggcursor) {
            // console.log(doc);
        }
        // console.log(getBlog)
        
        res.json({"blog":getBlog, success:true})
    }
    catch(error){
        console.log(error)
    }

        
}
const Delete_blog_controller = async (req,res)=>{
try{
    const blogdelete = await Blog.findByIdAndDelete({_id:req.params.bid})
    const Commentss = await Comment.deleteMany({Post_id:req.params.bid})
    console.log(Commentss)
    res.send({"message":"Blog Succefull Delete",success:true})
}
catch(error){
    console.log(error)
}


}
const Edit_blog_controller =async (req,res)=>{
try{
const blogedits = await Blog.findById({_id:req.params.beid})
res.json({"blogedit":blogedits})
}
catch(error){
    console.log(error)
}
}
const Update_status_controller = async(req,res)=>{
    try{
    const updatestatus = await Blog.findByIdAndUpdate({_id:req.params.uid},{status:req.body.status})
    
    }
    catch(error){
        console.log(error)
    }
}
const Update_blog_controller = async(req,res)=>{
try{
const {title,tag,decsription,category,metadescription,metatitle} = req.body
const slug = slugify(title, { lower: true })

const n = new Date()
const updated_at = n.toLocaleString([], { hour12: true});
const  blog_data = await Blog.findByIdAndUpdate({_id:req.body._id},{title,tag, decsription,category,slug, metadescription,metatitle,updated_at,image:req.files.newimage[0].filename})
res.json({"message":"update succesfully", "success":true})
}
catch(error){
    console.log(error)
}
}
const singleblog_controller = async (req,res)=>{
try{
const single_blog =await Blog.findOne({slug:req.params.sid}).populate("category")
res.json({"singleblog":single_blog,"success":true})
}
catch(error){
console.log(error)
}
}
const alltagges_controller = async(req,res)=>{
  try{ console.log(req.params.tid)
    const alltages = await Blog.findOne({slug:req.params.tid}).populate("category")
    res.json({"alltages":alltages,success:true})}
    catch(error){
        console.log(error)
    }
}
const Export_csv_controller =async (req,res)=>{
    console.log(req.body)
        try {
          // Fetch data from MongoDB
          const Users = await Blog.find();
        //   console.log(Users)
          const csvStream = csv.format({
            headers:true
          })
          if(!fs.existsSync('public/Files/export')){
            if(!fs.existsSync('public/Files')){
                fs.mkdirSync("public/Files")
            }
            if(!fs.existsSync('public/Files/export')){
                fs.mkdirSync('public/Files/export')
            }
          }
          const writableStream = fs.createWriteStream('public/Files/export/blog.csv')
          csvStream.pipe(writableStream)
          writableStream.on('finish',()=>{
            res.json({
                downloadUrl:'/Files/export/blog.csv'
            })
          })
          if(Users.length >0){
            // console.log(Users.length)
            Users.map(items=>{
                csvStream.write({
                    // _id:items._id ? items._id : '-',
                    title:items.title ? items.title : "-",
                
                    slug : items.slug ? items.slug : '-',
                    tag: items.tag ? items.tag : '-',
                    image: items.image ? items.image : 'no image',
                    metatitle: items.metatitle ? items.metatitle: '-',
                    category : items.category ? items.category : "-",
                    metadescription : items.metadescription ? items.metadescription : "-",
                    created_at : items.created_at ? items.created_at : "-",
                    updated_at : items.updated_at ? items.updated_at : "-",
                    status : items.status ? items.status : "-",
                    decsription : items.decsription ? items.decsription : "-"
                })
            })
          }
          console.log(csvStream)
          csvStream.end()
          writableStream.end()

    //   console.log(data)
  
        }
        catch(error){

        }
    
      
}
module.exports = {Add_Blog_controller,Blog_controller,Delete_blog_controller,Edit_blog_controller,Update_status_controller,Update_blog_controller,singleblog_controller,alltagges_controller,Export_csv_controller}