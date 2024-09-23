const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const IndexerSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'Userregister' },
    
    indexername: {type:String ,default:null},
    integration:{type:String},
    created_at:{type:Date},
    status:{type:Number,default:1},
    updated_at:{type:Date}

 })

 const Indexer_Add = mongoose.model('Indexer',IndexerSchema)

 module.exports = Indexer_Add