const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
 mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
 const SidebarSchema = mongoose.Schema({
    id: { type: Number },
    tab_name: { type: String },
    controller_name: { type: String },
    child_status: { type: Number },
    parent_id: { type: Number },
    status: { type: Number },
    tab_number: { type: Number, default: 0 },
    tab_icon: { type: String },
  });
  
  const Sidebar = mongoose.model('tbl_sidebar', SidebarSchema);

 module.exports = Sidebar