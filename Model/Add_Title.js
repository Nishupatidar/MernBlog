const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const TitleSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'Userregister' },
    
    title: {type:String,required:true,unique:true},
    keyword:{type:String,required:true},
    created_at:{type:Date,default:null},
    status:{type:Number,default:1},
    updated_at:{type:Date}

 })

 const Keywordadd = mongoose.model('mastertitle',TitleSchema)

 module.exports = Keywordadd