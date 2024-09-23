const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const KnowledgeSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'Userregister' },
    
    knowledegename: {type:String ,default:null},
    
    created_at:{type:Date},
    status:{type:Number,default:1},
    updated_at:{type:Date}

 })

 const Knowledge_Add = mongoose.model('Knowledge',KnowledgeSchema)

 module.exports = Knowledge_Add