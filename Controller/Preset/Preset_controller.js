 const Preset = require('../../Model/Preset')
 const Preset_create_controller = async(req,res)=>{
    try {
        console.log(req.body)
    
   
    const {presetname,generationmode,title,keyword,description,language,country,creativity,voice,pointofview,costominstruction,exactkeyword, webconnect,knowledgebase,blod,italics,tables,quotes,url,key,conclusion,articlesize,automateheadings,calltoaction,youtubelink,youtubevideo,imageprovider,promptimage,featuredimage,articleimage} = req.body
const created_at = new Date()
const result = await Preset({presetname,generationmode,title,keyword,description,language,country,creativity,voice,pointofview,costominstruction,exactkeyword, webconnect,knowledgebase,blod,italics,tables,quotes,created_at,url,key,conclusion,articlesize,automateheadings,calltoaction,youtubelink,youtubevideo,imageprovider,promptimage,featuredimage,articleimage })
console.log(result)
const titleshow = await result.save()
console.log(titleshow)
res.json({"message": "Successfully Add" ,success : true})
// console.log(titleshow)

    } catch (error) {
        console.log(error)

    }

}
const Preset_get_controller = async(req,res)=>{
    const preset = await Preset.find({})
    res.json({"preset":preset})
}
const Preset_edit_controller = async(req,res)=>{
    const preset = await Preset.findById({_id:req.params.eid})
    console.log(preset)
    res.json({"preset":preset})
}
const Preset_delete_controller = async(req,res)=>{
    try{
        const blogdelete = await Preset.findByIdAndDelete({_id:req.params.did})
        res.json({"message":"Preset Succefull Delete",success:true})
    }
    catch(error){
        console.log(error)
    }
}
const Preset_update_controller = async(req,res)=>{
    try {
        console.log("presetupdate",req.body)
    
    const {presetname,generationmode,title,keyword,description,language,country,creativity,voice,pointofview,costominstruction,exactkeyword, webconnect,knowledgebase,blod,italics,tables,quotes,url,key,conclusion,articlesize,automateheadings,calltoaction,youtubelink,youtubevideo,imageprovider,promptimage,featuredimage,articleimage} = req.body
const updated_at = new Date()
const result = await Preset.findByIdAndUpdate({_id:req.body._id},{presetname,generationmode,title,keyword,description,language,country,creativity,voice,pointofview,costominstruction,exactkeyword, webconnect,knowledgebase,blod,italics,tables,quotes,updated_at,url,key,conclusion,articlesize,automateheadings,calltoaction,youtubelink,youtubevideo,imageprovider,promptimage,featuredimage,articleimage })
console.log(result)

res.json({"message": " Preset Successfully update" ,success:true})
// console.log(titleshow)

    } catch (error) {
        console.log(error)

    }
}
module.exports = {Preset_create_controller,Preset_get_controller,Preset_edit_controller,Preset_delete_controller,Preset_update_controller}