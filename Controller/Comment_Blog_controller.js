const Blog = require('../Model/Add_Blog')
const Comment = require('../Model/Comment_Blog')
const Reply = require('../Model/Reply_Blog')
const Comment_Blog_controller = async(req,res) =>{
   try{ 
    console.log(req.body)
    const postid =await Blog.findOne({slug:req.body.postid})
    // console.log(postid)
    // console.log(postid._id)
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(req.connection.remoteAddress)
    // console.log(ipAddress)
    const Post_id = postid._id
    const n = new Date()
  const created_at = n
    // console.log(Post_id)
    const {name,email, content,captcha} = req.body
    const commentvalue = await  Comment({name,email,content,created_at,Post_id,captcha,ipAddress})
    // console.log(commentvalue)
    const result = await commentvalue.save()
    // console.log(result)
    res.json({"message":"comment add",success:true})}
    catch(error){
        console.log(error)
    }
    
}
const Show_comment_controller = async(req,res)=>{
try{const comment  = await Comment.find({}).populate("Post_id").sort({ created_at: -1})

res.json({"comment":comment})}
catch(error){
    console.log(error)
}
}
const Update_comment_status = async(req,res)=>{
   try{ const updatestatus = await Comment.findByIdAndUpdate({_id:req.params.uid},{status:req.body.status})
    // console.log(updatestatus)
}
    catch(error){
        console.log(error)
    }
}
const Delete_comment_controller = async(req,res)=>{
   try{ 
    const blogdelete = await Comment.findByIdAndDelete({_id:req.params.bid})
   await Reply.deleteMany({Comment_id:req.params.bid})
res.json({"message":"Comment Delete",success:true})}
catch(error){
    console.log(error)
}
}
const Edit_comment_controller = async(req,res)=>{
   try {const blogedits = await Comment.findById({_id:req.params.beid})
    // console.log(creditedits)
    res.json({"blogedit":blogedits})
}
    catch(error){
        console.log(error)
    }
}
const Update_comment_controller =async (req,res)=>{
try{
    // console.log(req.body)
const n = new Date()
const updated_at = n
const {name,email,content,Post_id} = req.body
const result = await Comment.findOneAndUpdate({_id:req.body._id},{name,email,content,Post_id,updated_at})
// console.log(result)
}
catch(error){
    console.log(error)
}
}
const reply_comment_controller = async(req,res)=>{
    // console.log(req.body)
    try {
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const created_at = new Date();
        
        const { rcomments, rid } = req.body;
        // console.log({ rcomments, rid });
    
        if (!rcomments) {
            throw new Error('rcomment is undefined in the request body');
        }
    
        const replyuser = await Reply({
            name: rcomments.name,
            email: rcomments.email,
            content: rcomments.content,
            Comment_id: rid,
            ipAddress,
            created_at
        });
    
        // console.log(replyuser);
        const replysave =  await replyuser.save()
        // console.log(replysave)
        res.json({ message: 'Reply added successfully',success:true });
    } catch (error) {
        console.error('Error handling reply:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    

}
const reply_user = async(req,res)=>{
    try{
const reply = await Reply.find({}).populate('Comment_id').sort({ created_at: -1})
// console.log(reply)
// console.log(reply)
res.json({"reply":reply})
    }
    catch(error){
        console.log(error)
    }
}
const reply_status_controller = async(req,res)=>{
    // console.log(req.params.rid)
    try{ const updatestatus = await Reply.findByIdAndUpdate({_id:req.params.rid},{status:req.body.status})
    // console.log(updatestatus)
}
    catch(error){
        console.log(error)
    }
}
const reply_delete_controller = async(req,res)=>{
    try{ const blogdelete = await Reply.findByIdAndDelete({_id:req.params.bid})
    res.json({"message":" Comment Delete",success:true})}
    catch(error){
        console.log(error)
    }
}
const reply_edit_controller = async(req,res)=>{
    try {const blogedits = await Reply.findById({_id:req.params.beid})
    // console.log(creditedits)
    res.json({"blogedit":blogedits})}
    catch(error){
        console.log(error)
    }

}
const reply_update_controller = async(req,res)=>{
    try{console.log(req.body)
        const n = new Date()
        const updated_at = n
        const {name,email,content,Comment_id} = req.body
        const result = await Reply.findOneAndUpdate({_id:req.body._id},{name,email,content,Comment_id,updated_at})
        // console.log(result)
    }
        catch(error){
            console.log(error)
        }
}
module.exports = {Comment_Blog_controller,Show_comment_controller,Update_comment_status,Delete_comment_controller,Edit_comment_controller,Update_comment_controller,reply_comment_controller,reply_user,reply_status_controller,reply_delete_controller,reply_edit_controller,reply_update_controller}