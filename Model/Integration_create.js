const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const IntegrationSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'Userregister' },
    
   IntegrationName: {type:String},
   Integrationtype : {type:String},
   shopname :{type:String ,default:""
   },
   token:{type:String,default:""},
   url : {type:String , default:""},
   password : {type:String , default:""},
   username : {type:String , default:""},
   Adminkey : {type:String , default :""},
   Author : {type:String , default : ""},
   status : {type:Number , default : 0 }, 
   // {0 : draft , 1:scheduled , 2:published}
   timegap : {type:String , default :""},
   siteid : {type : String , default:""},
   Apikey : {type :String , default : ""},
   blog: {type : String ,default : ""},
   created_at:{type:Date},
   updated_at:{type:Date}
})


   


 const Integration_Create = mongoose.model('Integrationcreate',IntegrationSchema)

 module.exports = Integration_Create