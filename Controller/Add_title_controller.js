const Title = require('../Model/Add_Title')
const Add_title_controller = async(req,res)=>{
    try {
        console.log(req.body)
const {title,keyword} = req.body
const created_at = new Date()
const result = await Title({title,keyword,created_at})
const titleshow = await result.save()
res.json({"message":"Title Succefull Add",success:true})
// console.log(titleshow)

    } catch (error) {
        console.log(error)
    }

}
const Get_title_controller = async(req,res)=>{
    try {
        const titlevalue = await Title.find({}).sort({created_at:-1})
        // console.log(titlevalue)
        // console.log("titlevalue",titlevalue)
        res.json({"titlevalue":titlevalue})
    } catch (error) {
        console.log(error)
    }
}
const Upadate_title_status_controller = async (req,res)=>{
    try{
        const updatestatus = await Title.findByIdAndUpdate({_id:req.params.uid},{status:req.body.status})
        
        }
        catch(error){
            console.log(error)
        }
}
const Delete_title_controller = async(req,res)=>{
    try{
        const blogdelete = await Title.findByIdAndDelete({_id:req.params.tid})
        res.json({"message":"Title Succefull Delete",success:true})
    }
    catch(error){
        console.log(error)
    }
}
const Edit_title_controller = async(req,res)=>{
    // console.log(req.body)
    try {const titleedits = await Title.findById({_id:req.params.beid})
    //  console.log("title",titleedits)
     res.json({"titleedits":titleedits})}
     catch(error){
         console.log(error)
     }
 }
 const Update_title_controller = async(req,res)=>{
    try{

        const{title,keyword} = req.body
        const updated_at = new Date()
        const updatestatus = await Title.findByIdAndUpdate({_id:req.body._id},{title,keyword,updated_at})
        // console.log(updatestatus)
        res.json({"message":" Title Successfully Update","success":true})
    }
    catch(error){
        console.log(error)
    }
 }
module.exports = {Add_title_controller,Get_title_controller,Upadate_title_status_controller,Delete_title_controller,Edit_title_controller,Update_title_controller}