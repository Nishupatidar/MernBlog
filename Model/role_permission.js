const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const Sidebar = require("./Sidebar")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const RoleSchema = mongoose.Schema({
    role_id:{type:Number},
    tab_id:{type:mongoose.Schema.Types.ObjectId, ref:Sidebar  ,default:0},
    view_status:{type:String},
    add_status:{type:String},
    edit_status:{type:String},
    delete_status:{type:String},
    created_at:{type:Date},
    status:{type:Number,default:1},
    updated_at:{type:Date}

 })

 const permission = mongoose.model('blog_role_permission',RoleSchema)

 module.exports = permission