const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const IntegrationSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'Userregister' },
    
    name: {type:String},
   created_at:{type:Date},
    status:{type:Number,default:1},
    updated_at:{type:Date}

 })

 const Integration = mongoose.model('Integration',IntegrationSchema)

 module.exports = Integration