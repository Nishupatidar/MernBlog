const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const ReplySchema = mongoose.Schema({
   //  Post_id:{type:mongoose.Schema.Types.ObjectId,ref:Blog,required: true },
    
    Comment_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment",
    required:true},
    name:{type:String},
    email:{type:String},
    content:{type:String},
    created_at:{type:Date, default:null},
    ipAddress:{type:String},
    status:{type:Number,default:0},
    updated_at:{type:Date , default:null}

 })

 const  Replyregister = mongoose.model('Reply',ReplySchema)

 module.exports = Replyregister