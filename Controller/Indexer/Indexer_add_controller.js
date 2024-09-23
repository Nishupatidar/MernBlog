const Indexer = require('../../Model/Indexer')
const Indexer_controller =async (req,res)=>{
    try{
    const {indexername,integration} = req.body
    
    const created_at = new Date()
    const result = await Indexer({indexername,integration ,created_at})
    const blog = await result.save()
    console.log(blog)
    res.json({"message":"Indexer Successfully",success:true})
    }
    catch(error){
        console.log(error)
    }
    }
    const Indexer_get_controller = async(req,res)=>{
         const SocialMedias = await Indexer.find({})
         res.json({"Indexer":SocialMedias})
    }
    const Indexer_delete_controller = async(req,res)=>{
        try{
            const blogdelete = await Indexer.findByIdAndDelete({_id:req.params.did})
            res.send({"message":"Indexer Succefull Delete",sucess:true})
        }
        catch(error){
            console.log(error)
        }
    }
    const Indexer_edit_controller = async(req,res)=>{
        try{
            const blogedits = await Indexer.findById({_id:req.params.eid})
            res.json({"indexeredit":blogedits})
            }
            catch(error){
                console.log(error)
            }
    }
    const Indexer_update_controller = async(req,res)=>{
        try{
            console.log(req.body)
            const {indexername,integration} = req.body
            
            const updated_at = new Date()
            const result = await Indexer.findByIdAndUpdate({_id:req.body._id},{indexername,integration ,updated_at})
            // const blog = await result.save()
            // console.log(blog)
            res.json({"message":"Update Indexer Successfully",success:true})
            }
            catch(error){
                console.log(error)
            }
    }
    module.exports = {Indexer_controller,Indexer_get_controller,Indexer_delete_controller,Indexer_edit_controller,Indexer_update_controller}