const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const LoginSchema = mongoose.Schema({
   email:{type:String,unique:true,require:true},
    password:{type:String,require},
    status:{type:Boolean},
    token:{type:String}
    

 })
 const Adminlogin = mongoose.model('login',LoginSchema)
 module.exports = Adminlogin