// const { ObjectId } = require("mongodb")
// const mongoose = require("mongoose")
//  mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
//  const CategorySchema = mongoose.Schema({
//     User:{type:mongoose.Schema.Types.ObjectId,ref:'Userregister' },
    
//     category_name: {type:String},
//    //  description:{type:String},
//     created_at:{type:Date},
//     status:{type:Number,default:1},
//     updated_at:{type:Date}

//  })

//  const Categoryregister = mongoose.model('Categories',CategorySchema)

//  module.exports = Categoryregister
 const mongoose = require("mongoose");
 const { ObjectId } = mongoose.Types;
 const Post = require("../Model/Add_Blog")
 const Comment = require('./Comment_Blog')
 const Reply = require('./Reply_Blog')
 
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`);
 
 const CategorySchema = mongoose.Schema({
     User: { type: mongoose.Schema.Types.ObjectId, ref: 'Userregister' },
     category_name: { type: String },
     created_at: { type: Date },
     status: { type: Number, default: 1 },
     updated_at: { type: Date }
 });
 
 // Pre-remove middleware for Categories
 CategorySchema.pre('remove', async function (next) {
     try {
         // Delete all related documents (assuming 'Post' and 'Comment' models)
         await Post.deleteMany({ category: this._id }); // Assuming 'Post' model exists
         await Comment.deleteMany({ Post_id: this._id }); // Assuming 'Comment' model exists
         await Reply.deleteMany({Comment_id:this._id})
         next();
     } catch (error) {
         next(error);
     }
 });
 
 const Categoryregister = mongoose.model('Categories', CategorySchema);
 
 module.exports = Categoryregister;
 