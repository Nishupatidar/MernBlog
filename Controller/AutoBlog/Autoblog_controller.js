const Autoblog = require('../../Model/Autoblog')
const Autoblog_create_controller =async (req,res)=>{
    try{
    const {autoblogname,preset,status,quantity,timedelay,integration} = req.body
    
    const created_at = new Date()
    const Autoblogname = await Autoblog.findOne({autoblogname})
    if(Autoblogname == null){

   
    const result = await Autoblog({autoblogname,preset,status,quantity,timedelay,integration ,created_at})
    const blog = await result.save()
    console.log(blog)
    res.json({"message":"Autoblog Successfully",success:true})
    }
    else{
        res.json({"message":"Autoblog Name Aleready Exist",success:false})
    }
    }
    catch(error){
        console.log(error)
    }
    }
    const Autoblog_get_controller = async(req,res)=>{
         const SocialMedias = await Autoblog.find({})
         res.json({"Autoblog":SocialMedias})
    }
    const Autoblog_edit_controller = async(req,res)=>{
        try{
            const blogedits = await Autoblog.findById({_id:req.params.eid})
            console.log(blogedits)
            res.json({"autoblogedit":blogedits})
            }
            catch(error){
                console.log(error)
            }
    }
    const Autoblog_delete_controller = async(req,res)=>{
        try{
            const blogdelete = await Autoblog.findByIdAndDelete({_id:req.params.did})
            res.json({"message":"Autoblog Succefull Delete",success:true})
        }
        catch(error){
            console.log(error)
        }
    }
    const Autoblog_update_controller = async(req,res)=>{
        try{
            console.log(req.body)
            const {autoblogname,preset,status,quantity,timedelay,integration} = req.body
            
            const updated_at = new Date()
            const result = await Autoblog.findByIdAndUpdate({_id:req.body._id},{autoblogname,preset,status,quantity,timedelay,integration,updated_at})
            // const blog = await result.save()
            // console.log(blog)
            res.json({"message":"Update Autoblog Successfully",success:true})
            }
            catch(error){
                console.log(error)
            }
    }
    module.exports = {Autoblog_create_controller,Autoblog_get_controller,Autoblog_edit_controller,Autoblog_delete_controller,Autoblog_update_controller}