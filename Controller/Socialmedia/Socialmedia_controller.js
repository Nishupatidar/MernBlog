const SocialMedia = require('../../Model/Social_media')
const Socialmedia_controller =async (req,res)=>{
    try{
    const {socailmedianame,type,facebook_page,syndiication} = req.body
    
    const created_at = new Date()
    const result = await SocialMedia({socailmedianame,type,facebook_page, syndiication })
    const blog = await result.save()
    console.log(blog)
    res.json({"message":"Social_media Successfully Add",success:true})
    }
    catch(error){
        console.log(error)
    }
    }
    const Social_media_get_controller = async(req,res)=>{
         const SocialMedias = await SocialMedia.find({})
         res.json({"Socialmedia":SocialMedias})
    }
    const Social_media_edit_controller = async(req,res)=>{
        try{
            const blogedits = await SocialMedia.findById({_id:req.params.eid})
            res.json({"socialedit":blogedits})
            }
            catch(error){
                console.log(error)
            }
    }
    const Social_media_delete_controller = async(req,res)=>{
        try{
            const blogdelete = await SocialMedia.findByIdAndDelete({_id:req.params.did})
            res.json({"message":"Social Media Succefull Delete",success:true})
        }
        catch(error){
            console.log(error)
        }
    }
    const Social_media_update_controller =  async(req,res)=>{
        try{
            const {socailmedianame,type,facebook_page,syndiication} = req.body
            
            const updated_at = new Date()
            const result = await SocialMedia.findByIdAndUpdate({_id:req.body._id},{socailmedianame,type,facebook_page, syndiication,updated_at })
            // const blog = await result.save()
            // console.log(blog)
            res.json({"message":"Social_media update Successfully",success:true})
            }
            catch(error){
                console.log(error)
            }

    }
    module.exports = {Socialmedia_controller,Social_media_get_controller,Social_media_edit_controller,Social_media_delete_controller,Social_media_update_controller}