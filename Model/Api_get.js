const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const RegisterSchema = mongoose.Schema({
    Userid:{type:ObjectId},
    username:String,
    email:{type:String,unique:true,require:true},
    password:{type:String,require},
    role:{type:String},
    description:{type:String},
    created_at:{type:Date,default:Date.now},
    Status:{type:Number, default:1 },
    updated_at:{type:Date,default:Date.now}

 })
 const Api_get = mongoose.model('Userregister',RegisterSchema)
 module.exports = Api_get