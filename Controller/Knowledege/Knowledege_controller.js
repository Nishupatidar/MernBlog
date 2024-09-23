const Knowledge = require('../../Model/Knowledege')
const Knowledge_controller =async (req,res)=>{
    try{
    const {knowledegename} = req.body
    
    const created_at = new Date()
    const result = await Knowledge({knowledegename ,created_at})
    const blog = await result.save()
    console.log(blog)
    res.json({"message":"Knowledege Base Successfully",success:true})
    }
    catch(error){
        console.log(error)
    }
    }
    const Knowledege_get_controller = async(req,res)=>{
const knowledegebase = await Knowledge.find({})
res.json({"knowledege":knowledegebase})
    }
    const Knowledege_delete_controller = async(req,res)=>{
        try{
            const blogdelete = await Knowledge.findByIdAndDelete({_id:req.params.did})
            res.json({"message":"Knowledege Succefull Delete",success:true})
        }
        catch(error){
            console.log(error)
        }
    }
    const Knowledege_edit_controller = async(req,res)=>{

    try{
        const blogedits = await Knowledge.findById({_id:req.params.eid})
        res.json({"knowledge":blogedits})
        }
        catch(error){
            console.log(error)
    }
}
const Knowledege_update_controller = async(req,res)=>{
    try{
        console.log(req.body)
        const {knowledegename} = req.body
        
        const updated_at = new Date()
        const result = await Knowledge.findByIdAndUpdate({_id:req.body._id},{knowledegename ,updated_at})
       
        res.json({"message":"Knowledege Base Update Successfully",success:true})
        }
        catch(error){
            console.log(error)
        }
}
    module.exports = {Knowledge_controller,Knowledege_get_controller,Knowledege_delete_controller,Knowledege_edit_controller,Knowledege_update_controller}