const { Int32 } = require('mongodb');

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const categories = require('../Model/Category')

// Define the Schema
  const postSchema = new mongoose.Schema({
    title: { type: String},
    // content: { type: String },
    // author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    // category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    tag: { type: String },
    // image:{type:Array},
    image:{type:String,default:'1715165710560download.png'},
    status: { type:Number,default:1 },
    slug: { type: String},
    decsription:{type:String , default:''},
    category:{type:mongoose.Schema.Types.ObjectId,
    ref:"Categories",
    },
    blogstatus:{type:String,default:''},
    metatitle:{type:String,default:''},
    metadescription:{type:String,default:''},

    created_at: { type: Date },

    updated_at: { type: String},
  });

// Create the Model
const Blog = mongoose.model('Blog', postSchema);
module.exports = Blog