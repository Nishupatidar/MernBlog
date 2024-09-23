const Reply = require('../Model/Reply_Blog')
const MultipleDatacontroller = async(req,res)=>{
    console.log(req.body.ids)
    // const datadelete = await Reply.deleteMany({_id:{$in:req.body.ids}})
res.json({"message":"delete Successfully","success":true})
// console.log(datadelete)

// console.log(req.body.ids)

}
module.exports = MultipleDatacontroller