
const Blog = require('./Add_Blog')
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const CommentSchema = mongoose.Schema({
   //  Post_id:{type:mongoose.Schema.Types.ObjectId,ref:Blog,required: true },
    
    Post_id: {type:mongoose.Schema.Types.ObjectId,ref:"Blog",required:true},
    name:{type:String},
    email:{type:String},
    content:{type:String},
    created_at:{type:Date ,default:null},
    ipAddress:{type:String},
    status:{type:Number,default:0},
    updated_at:{type:String}

 })

 const Commentregister = mongoose.model('Comment',CommentSchema)

 module.exports = Commentregister