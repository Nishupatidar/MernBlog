const Integration = require('../../Model/Integration_create')
const Integration_create_controller = async(req,res)=>{
    try {
        console.log(req.body)
const {IntegrationName,Integrationtype,shopname,token,url,password,username,Adminkey,Author,status,timegap,siteid,Apikey,blog} = req.body
const created_at = new Date()
const integrationname = await Integration.findOne({IntegrationName})
if(integrationname == null){
const result = await Integration({IntegrationName,Integrationtype,shopname,token,url,password,username,Adminkey,Author,status,timegap,siteid,Apikey,blog,created_at })
console.log(result)
const titleshow = await result.save()
res.json({"message": "Successfully Add" ,success : true})
}
else{
    res.json({"message":"Integration Name Already Exist",success:false})
}
// console.log(titleshow)
} catch (error) {

        console.log(error)

    }

}
const Integration_get_controller = async(req,res)=>{
    const SocialMedias = await Integration.find({})
    res.json({"Integration":SocialMedias})
}
const Integration_edit_controller = async(req,res)=>{
console.log(req.params.eid)
try{
    const blogedits = await Integration.findById({_id:req.params.eid})
    res.json({"integrationedit":blogedits})
    }
    catch(error){
        console.log(error)
    }
}
const Integration_delete_controller = async(req,res)=>{
    console.log(req.params.did)
    try{
        const blogdelete = await Integration.findByIdAndDelete({_id:req.params.did})
        res.json({"message":"Integration Succefull Delete",success:true})
    }
    catch(error){
        console.log(error)
    }
}
const Integration_update_controller = async(req,res)=>{
    try {
        console.log(req.body)
const {IntegrationName,Integrationtype,shopname,token,url,password,username,Adminkey,Author,status,timegap,siteid,Apikey,blog} = req.body
const updated_at = new Date()
const result = await Integration.findByIdAndUpdate({_id:req.body._id},{IntegrationName,Integrationtype,shopname,token,url,password,username,Adminkey,Author,status,timegap,siteid,Apikey,blog,updated_at })
console.log(result)
// const titleshow = await result.save()
res.json({"message": " Integration Successfully Update" ,success : true})
// console.log(titleshow)

    } catch (error) {
        console.log(error)

    }
}
module.exports = {Integration_create_controller,Integration_get_controller,Integration_edit_controller,Integration_delete_controller,Integration_update_controller}