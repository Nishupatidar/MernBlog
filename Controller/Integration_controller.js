const Integartion = require('../Model/Integration')
const Integration_controller = async(req,res)=>{
    try {
        console.log(req.body)
const {name} = req.body
const created_at = new Date()
const result = await Integartion({name,created_at})
const titleshow = await result.save()
console.log(titleshow)

    } catch (error) {
        console.log(error)
    }

}
const Get_Integration_controller = async(req,res)=>{
    try {
        const titlevalue = await Integartion.find({}).sort({created_at:-1})
        res.json({"titlevalue":titlevalue})
    } catch (error) {
        console.log(error)
    }
}
const Delete_Integration_controller = async(req,res)=>{
    try{
        const blogdelete = await Integartion.findByIdAndDelete({_id:req.params.tid})
        // res.json({"message":"Category Succefull Delete",sucess:true,blogdelete:blogdelete})
    }
    catch(error){
        console.log(error)
    }
}
const Edit_Integration_controller = async(req,res)=>{
    try {const titleedits = await Integartion.findById({_id:req.params.beid})
     console.log("title",titleedits)
     res.json({"titleedits":titleedits})}
     catch(error){
         console.log(error)
     }
 }
 const Update_Integration_controller = async(req,res)=>{
    try{

        const{name} = req.body
        const updated_at = new Date()
        const updatestatus = await Integartion.findByIdAndUpdate({_id:req.body._id},{name,updated_at})
        console.log(updatestatus)
        res.json({"message":"Successfully Update","success":true})
    }
    catch(error){
        console.log(error)
    }

 }
 const Upadate_Integration_status_controller =async (req,res)=>{
    try{
        const updatestatus = await Integartion.findByIdAndUpdate({_id:req.params.uid},{status:req.body.status})
        
        }
        catch(error){
            console.log(error)
        }
}
module.exports = {Integration_controller,Get_Integration_controller,Delete_Integration_controller,Edit_Integration_controller,Update_Integration_controller,Upadate_Integration_status_controller}