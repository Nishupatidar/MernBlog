const sidebar = require('../Model/Sidebar')
const sidebar_controller =async (req,res)=>{
   const sidebardata = await  sidebar.find({})
   res.json({sidebar:sidebardata})
      
}
const role_permission_controller = async (req,res)=>{

}
module.exports = {sidebar_controller,role_permission_controller}