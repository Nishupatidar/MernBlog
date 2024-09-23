const Userid = require('../Model/Signup_model')
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const SubscribeSchema = mongoose.Schema({
    Userid:{type:mongoose.Schema.Types._id,ref:Userid},
    name:String,
    email:{type:String,unique:true,require:true},
    Status:{type:Number, default:pendding },
    
 })
 const Userregister = mongoose.model('Subscribe',SubscribeSchema)
 module.exports = Userregister