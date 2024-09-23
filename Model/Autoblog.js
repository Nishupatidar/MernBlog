const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const AutoblogSchema = mongoose.Schema({
    
    
    autoblogname: {type:String , default:""},
    preset:{type:String, default:""},
    status:{type:Number,default:0},
    quantity:{type:Number,default:0},
    timedelay:{type:String,default:""},
    integration:{type:String,default:""},

    created_at:{type:Date,default:null} ,
    updated_at:{type:Date}

 })

 const Autoblogregister = mongoose.model('Autoblog',AutoblogSchema)

 module.exports = Autoblogregister