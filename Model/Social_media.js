const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const SocialSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'Userregister' },
    
    socailmedianame: {type:String ,default:null},
    type:{type:String},
    facebook_page:{type:String,default:null},
    syndiication:{type:String},
    created_at:{type:Date},
    status:{type:Number,default:1},
    updated_at:{type:Date}

 })

 const Social_media_add = mongoose.model('Social_Media',SocialSchema)

 module.exports = Social_media_add